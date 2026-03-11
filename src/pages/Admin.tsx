import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
    Loader2, Mail, MapPin, Calendar, User, MessageSquare, Tag, 
    LogOut, Settings, Users, Image as ImageIcon, Save, 
    ExternalLink, Plus, Trash2, Mountain, Star, Clock, 
    LayoutDashboard, Briefcase, Quote as QuoteIcon, X, Folders,
    Globe, Brush, Share2, Layout
} from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";

interface Application {
    id: string;
    created_at: string;
    name: string;
    email: string;
    country: string;
    program: string;
    message: string;
}

export default function Admin() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [activeTab, setActiveTab] = useState<"submissions" | "content" | "settings">("submissions");
    const [activeSection, setActiveSection] = useState("hero");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [siteContent, setSiteContent] = useState<Record<string, any>>({});
    
    // List Content States
    const [programs, setPrograms] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [trails, setTrails] = useState<any[]>([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/login");
            } else {
                setUserEmail(session.user.email || null);
                fetchAllData();
            }
        };

        checkAuth();
    }, [navigate]);

    async function fetchAllData() {
        setLoading(true);
        await Promise.all([
            fetchApplications(),
            fetchSiteContent(),
            fetchPrograms(),
            fetchTestimonials(),
            fetchTrails()
        ]);
        setLoading(false);
    }

    async function fetchApplications() {
        const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
        setApplications(data || []);
    }

    async function fetchSiteContent() {
        const { data } = await supabase.from("site_content").select("*");
        const contentMap = (data || []).reduce((acc: any, item: any) => {
            acc[`${item.section}:${item.key}`] = item;
            return acc;
        }, {});
        setSiteContent(contentMap);
    }

    async function fetchPrograms() {
        const { data } = await supabase.from("programs").select("*").order("order", { ascending: true });
        setPrograms(data || []);
    }

    async function fetchTestimonials() {
        const { data } = await supabase.from("testimonials").select("*").order("order", { ascending: true });
        setTestimonials(data || []);
    }

    async function fetchTrails() {
        const { data } = await supabase.from("trails").select("*").order("order", { ascending: true });
        setTrails(data || []);
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const handleContentChange = (section: string, key: string, value: string, isImage = false) => {
        const id = `${section}:${key}`;
        setSiteContent(prev => ({
            ...prev,
            [id]: { ...prev[id], section, key, [isImage ? 'image_url' : 'content']: value }
        }));
    };

    const handleDeleteSubmission = async (id: string) => {
        if (!confirm("Are you sure you want to delete this submission?")) return;
        
        setSaving(true);
        try {
            const { error } = await supabase.from("applications").delete().eq("id", id);
            if (error) throw error;
            setApplications(prev => prev.filter(app => app.id !== id));
        } catch (err: any) {
            alert("Error deleting submission: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        setSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: passwordData.newPassword });
            if (error) throw error;
            alert("Password updated successfully!");
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (err: any) {
            alert("Error updating password: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveContent = async (section: string, key: string) => {
        const id = `${section}:${key}`;
        const item = siteContent[id];
        if (!item) return;

        setSaving(true);
        try {
            await supabase.from("site_content").upsert({
                section: item.section,
                key: item.key,
                content: item.content,
                image_url: item.image_url
            }, { onConflict: 'section,key' });
            alert('Content saved!');
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (section: string, key: string, file: File) => {
        setSaving(true);
        try {
            console.log(`Starting upload for ${section}:${key}...`);
            const url = await uploadImage(file, `site-content/${section}`);
            
            if (url) {
                console.log("Upload successful, saving to database:", url);
                
                // Update local state first
                handleContentChange(section, key, url, true);
                
                // Prepare the payload
                const currentItem = siteContent[`${section}:${key}`];
                const payload = {
                    section,
                    key,
                    content: currentItem?.content || '',
                    image_url: url
                };

                const { error: upsertError } = await supabase
                    .from("site_content")
                    .upsert(payload, { onConflict: 'section,key' });

                if (upsertError) {
                    throw new Error("Failed to save image URL to database: " + upsertError.message);
                }
                
                alert("Image uploaded and saved successfully!");
            }
        } catch (err: any) {
            console.error("Image upload error:", err);
            alert("Error: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    // List Handlers
    const handleAddListItem = async (table: string, defaultData: any) => {
        setSaving(true);
        try {
            const { data, error } = await supabase.from(table).insert([defaultData]).select();
            if (error) throw error;
            if (data) {
                if (table === 'programs') setPrograms(prev => [...prev, data[0]]);
                if (table === 'testimonials') setTestimonials(prev => [...prev, data[0]]);
                if (table === 'trails') setTrails(prev => [...prev, data[0]]);
            }
        } catch (err: any) {
            alert("Error adding item: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteListItem = async (table: string, id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        setSaving(true);
        try {
            const { error } = await supabase.from(table).delete().eq('id', id);
            if (error) throw error;
            if (table === 'programs') setPrograms(prev => prev.filter(p => p.id !== id));
            if (table === 'testimonials') setTestimonials(prev => prev.filter(t => t.id !== id));
            if (table === 'trails') setTrails(prev => prev.filter(t => t.id !== id));
        } catch (err: any) {
            alert("Error deleting item: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleLocalUpdate = (table: string, id: string, updates: any) => {
        const syncState = (prev: any[]) => prev.map(item => item.id === id ? { ...item, ...updates } : item);
        if (table === 'programs') setPrograms(syncState);
        if (table === 'testimonials') setTestimonials(syncState);
        if (table === 'trails') setTrails(syncState);
    };

    const handleUpdateListItem = async (table: string, id: string) => {
        setSaving(true);
        try {
            const item = (table === 'programs' ? programs : table === 'testimonials' ? testimonials : trails).find(i => i.id === id);
            if (!item) return;

            const { error } = await supabase.from(table).update(item).eq('id', id);
            if (error) throw error;
            alert(`${table.slice(0, -1)} saved!`);
        } catch (err: any) {
            alert("Error updating item: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#0A0906", color: "#F2EEE8" }}>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", minHeight: "100vh" }}>
                {/* Sidebar */}
                <div style={{ 
                    width: isMobile ? "100%" : "260px", 
                    background: "#0E0D0A", 
                    borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.05)", 
                    borderBottom: isMobile ? "1px solid rgba(255,255,255,0.05)" : "none",
                    padding: isMobile ? "20px" : "40px 20px", 
                    display: "flex", 
                    flexDirection: isMobile ? "row" : "column", 
                    alignItems: isMobile ? "center" : "stretch",
                    justifyContent: isMobile ? "space-between" : "flex-start",
                    position: isMobile ? "sticky" : "fixed", 
                    top: 0,
                    zIndex: 100,
                    height: isMobile ? "auto" : "100vh" 
                }}>
                    {!isMobile && (
                        <div style={{ padding: "0 10px 24px", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4CAF73" }}></div>
                                <span style={{ fontSize: "11px", color: "rgba(242,238,232,0.6)", fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userEmail}</span>
                            </div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 6px", background: "rgba(201,169,110,0.1)", borderRadius: "3px" }}>
                                <Star size={10} style={{ color: "#C9A96E" }} />
                                <span style={{ fontSize: "9px", color: "#C9A96E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Master Admin</span>
                            </div>
                        </div>
                    )}

                    <nav style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: "8px", flex: isMobile ? "none" : 1 }}>
                        <NavButton active={activeTab === "submissions"} onClick={() => setActiveTab("submissions")} icon={<Users size={18} />} label={isMobile ? "" : "Submissions"} />
                        <NavButton active={activeTab === "content"} onClick={() => setActiveTab("content")} icon={<Layout size={18} />} label={isMobile ? "" : "Site Content"} />
                        <NavButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")} icon={<Settings size={18} />} label={isMobile ? "" : "Settings"} />
                    </nav>

                    <button onClick={handleLogout} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "12px", 
                        padding: isMobile ? "8px" : "12px 16px", 
                        borderRadius: "4px", 
                        border: "1px solid rgba(232,64,64,0.1)", 
                        background: "rgba(232,64,64,0.02)", 
                        cursor: "pointer", 
                        color: "#E84040", 
                        marginTop: isMobile ? "0" : "auto" 
                    }}>
                        <LogOut size={18} /> {!isMobile && "Log Out"}
                    </button>
                </div>

                {/* Main Content Area */}
                <div style={{ 
                    flex: 1, 
                    padding: isMobile ? "30px 20px" : "60px 48px", 
                    marginLeft: isMobile ? "0" : "260px", 
                    marginTop: isMobile ? "0" : "0",
                    overflowY: "auto" 
                }}>
                    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                        {activeTab === "submissions" ? (
                            <SubmissionsView 
                                applications={applications} 
                                loading={loading} 
                                error={error} 
                                onRefresh={fetchApplications} 
                                onDelete={handleDeleteSubmission}
                                isMobile={isMobile} 
                                saving={saving}
                            />
                        ) : activeTab === "settings" ? (
                            <SettingsView 
                                siteContent={siteContent} 
                                onContentChange={handleContentChange} 
                                onSave={handleSaveContent} 
                                onImageUpload={handleImageUpload}
                                saving={saving}
                                isMobile={isMobile}
                                passwordData={passwordData}
                                setPasswordData={setPasswordData}
                                onUpdatePassword={handleUpdatePassword}
                            />
                        ) : (
                            <ContentView 
                                activeSection={activeSection} setActiveSection={setActiveSection}
                                siteContent={siteContent} onContentChange={handleContentChange} onSave={handleSaveContent} onImageUpload={handleImageUpload}
                                programs={programs} onAddProgram={() => handleAddListItem('programs', { tier: '01', name: 'New Program', subtitle: 'Program Subtitle', price: '$0', tag: 'Limited', description: 'Program Description', order: programs.length })} onDeleteProgram={(id: string) => handleDeleteListItem('programs', id)} onUpdateProgram={(tableName: string, id: string) => handleUpdateListItem(tableName, id)} onLocalUpdateProgram={(id: string, updates: any) => handleLocalUpdate('programs', id, updates)}
                                testimonials={testimonials} onAddTestimonial={() => handleAddListItem('testimonials', { name: 'New Name', country: 'Country', quote: 'Experience quote...', program: 'Program name', order: testimonials.length })} onDeleteTestimonial={(id: string) => handleDeleteListItem('testimonials', id)} onUpdateTestimonial={(tableName: string, id: string) => handleUpdateListItem(tableName, id)} onLocalUpdateTestimonial={(id: string, updates: any) => handleLocalUpdate('testimonials', id, updates)}
                                trails={trails} onAddTrail={() => handleAddListItem('trails', { name: 'Trail Name', location: 'Location', elevation: '0m', description: 'Trail description', order: trails.length })} onDeleteTrail={(id: string) => handleDeleteListItem('trails', id)} onUpdateTrail={(tableName: string, id: string) => handleUpdateListItem(tableName, id)} onLocalUpdateTrail={(id: string, updates: any) => handleLocalUpdate('trails', id, updates)}
                                saving={saving}
                                isMobile={isMobile}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavButton({ active, onClick, icon, label }: any) {
    return (
        <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "4px", border: "none", cursor: "pointer", transition: "all 0.2s", textAlign: "left", background: active ? "rgba(201,169,110,0.1)" : "transparent", color: active ? "#C9A96E" : "rgba(242,238,232,0.6)" }}>
            {icon} {label && <span>{label}</span>}
        </button>
    );
}

function SettingsView({ siteContent, onContentChange, onSave, onImageUpload, saving, isMobile, passwordData, setPasswordData, onUpdatePassword }: any) {
    const renderSettingField = (label: string, key: string, type: 'text' | 'textarea' | 'image' | 'toggle' = 'text') => {
        const id = `settings:${key}`;
        const item = siteContent[id] || { content: '', image_url: '' };

        if (type === 'image') {
            return (
                <ImageField 
                    label={label} 
                    url={item.image_url} 
                    onUpload={(file: File) => onImageUpload('settings', key, file)}
                    onSelectLibrary={(url: string) => onContentChange('settings', key, url, true)}
                    saving={saving}
                    isMobile={isMobile}
                />
            );
        }

        if (type === 'toggle') {
            const isActive = item.content === 'true';
            return (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                        <p style={{ fontSize: "14px", fontWeight: 500, color: "#F2EEE8" }}>{label}</p>
                        <p style={{ fontSize: "11px", opacity: 0.4 }}>{isActive ? "Enabled" : "Disabled"}</p>
                    </div>
                    <button 
                        onClick={() => {
                            onContentChange('settings', key, !isActive ? 'true' : 'false');
                            setTimeout(() => onSave('settings', key), 100);
                        }}
                        style={{ background: isActive ? "#C9A96E" : "rgba(255,255,255,0.1)", border: "none", width: "40px", height: "20px", borderRadius: "10px", position: "relative", cursor: "pointer", transition: "all 0.3s" }}
                    >
                        <div style={{ position: "absolute", top: "2px", left: isActive ? "22px" : "2px", width: "16px", height: "16px", background: isActive ? "#0A0906" : "#F2EEE8", borderRadius: "50%", transition: "all 0.3s" }} />
                    </button>
                </div>
            );
        }

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <EditorField 
                    label={label}
                    value={item.content || ''}
                    onChange={(val: string) => onContentChange('settings', key, val)}
                    onSave={() => onSave('settings', key)}
                    textarea={type === 'textarea'}
                    saving={saving}
                    isMobile={isMobile}
                />
            </div>
        );
    };

    return (
        <div style={{ display: "grid", gap: "48px" }}>
            <div>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "42px", fontWeight: 600, marginBottom: "8px" }}>Site Settings</h1>
                <p style={{ fontSize: "14px", color: "rgba(242,238,232,0.5)" }}>Manage global site configurations and SEO.</p>
            </div>

            <div style={{ display: "grid", gap: "40px" }}>
                {/* SEO Section */}
                <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#C9A96E" }}>
                        <Globe size={18} />
                        <h3 style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700 }}>SEO & Social Metadata</h3>
                    </div>
                    <div style={{ display: "grid", gap: "24px" }}>
                        {renderSettingField("Site Title", "site_title")}
                        {renderSettingField("Meta Description", "meta_description", "textarea")}
                        {renderSettingField("Social Preview Image", "social_image", "image")}
                    </div>
                </section>

                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)" }} />

                {/* Appearance Section */}
                <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#C9A96E" }}>
                        <Brush size={18} />
                        <h3 style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700 }}>Global Appearance</h3>
                    </div>
                    <div style={{ display: "grid", gap: "24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "24px" }}>
                            {renderSettingField("Maintenance Mode", "maintenance_mode", "toggle")}
                            {renderSettingField("Top Banner Active", "banner_active", "toggle")}
                        </div>
                        {renderSettingField("Top Banner Text", "banner_text")}
                        {renderSettingField("Site Logo", "site_logo", "image")}
                    </div>
                </section>

                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)" }} />

                {/* Social Section */}
                <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#C9A96E" }}>
                        <Share2 size={18} />
                        <h3 style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700 }}>Social Links</h3>
                    </div>
                    <div style={{ display: "grid", gap: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                            {renderSettingField("Instagram URL", "instagram")}
                            {renderSettingField("Facebook URL", "facebook")}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                            {renderSettingField("YouTube URL", "youtube")}
                            {renderSettingField("Contact Email", "contact_email")}
                        </div>
                    </div>
                </section>

                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)" }} />

                {/* Analytics Section */}
                <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#C9A96E" }}>
                        <LayoutDashboard size={18} />
                        <h3 style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700 }}>Analytics Tracking</h3>
                    </div>
                    <div style={{ display: "grid", gap: "20px" }}>
                        <p style={{ fontSize: "12px", opacity: 0.5, marginBottom: "8px" }}>Paste your Google Analytics or tracking scripts here. They will be injected into the site's head tag.</p>
                        {renderSettingField("Tracking Script", "analytics_script", "textarea")}
                    </div>
                </section>

                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)" }} />

                {/* Security Section */}
                <section>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", color: "#E84040" }}>
                        <X size={18} />
                        <h3 style={{ textTransform: "uppercase", fontSize: "12px", letterSpacing: "0.2em", fontWeight: 700 }}>Security & Account</h3>
                    </div>
                    <form onSubmit={onUpdatePassword} style={{ background: "rgba(232,64,64,0.02)", border: "1px solid rgba(232,64,64,0.1)", borderRadius: "8px", padding: "24px", display: "grid", gap: "20px" }}>
                        <p style={{ fontSize: "13px", fontWeight: 500, color: "#F2EEE8" }}>Change Admin Password</p>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4 }}>New Password</label>
                                <input 
                                    type="password" 
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "10px", color: "#F2EEE8" }}
                                    required
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4 }}>Confirm Password</label>
                                <input 
                                    type="password" 
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "10px", color: "#F2EEE8" }}
                                    required
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            disabled={saving}
                            style={{ background: "#E84040", color: "#F2EEE8", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: 600, fontSize: "13px", transition: "opacity 0.2s" }}
                        >
                            {saving ? "Updating..." : "Update Password"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}


function SubmissionsView({ applications, loading, error, onRefresh, onDelete, isMobile, saving }: any) {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "center" : "start", marginBottom: "48px", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "16px" : "0", textAlign: isMobile ? "center" : "left" }}>
                <div>
                    <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "42px", fontWeight: 600, marginBottom: "8px" }}>Applications</h1>
                    <p style={{ fontSize: "14px", color: "rgba(242,238,232,0.5)" }}>Manage incoming rider submissions.</p>
                </div>
                <button onClick={onRefresh} style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#C9A96E", padding: "10px 20px", borderRadius: "4px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
                    Refresh
                </button>
            </div>

            {loading ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}><Loader2 className="animate-spin" size={32} color="#C9A96E" /></div>
            ) : applications.length === 0 ? (
                <div style={{ padding: "100px 0", textAlign: "center", opacity: 0.5 }}><p>No applications yet.</p></div>
            ) : (
                <div style={{ display: "grid", gap: "24px" }}>
                    {applications.map((app: any) => (
                        <div key={app.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: isMobile ? "0" : "0", overflow: "hidden" }}>
                            <div style={{ padding: isMobile ? "20px" : "32px" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", marginBottom: "24px" }}>
                                    <InfoItem icon={<User size={16} />} label="Name" val={app.name} />
                                    <InfoItem icon={<Mail size={16} />} label="Email" val={app.email} />
                                    <InfoItem icon={<Tag size={16} />} label="Program" val={app.program || "General"} />
                                    <InfoItem icon={<MapPin size={16} />} label="Country" val={app.country || "N/A"} />
                                </div>
                                <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                        <MessageSquare size={16} style={{ color: "#C9A96E", marginTop: "2px" }} />
                                        <div style={{ flex: 1 }}><p style={{ fontSize: "11px", textTransform: "uppercase", opacity: 0.4, marginBottom: "8px" }}>Message</p><p style={{ fontSize: "14px", lineHeight: "1.6", color: "rgba(242,238,232,0.8)" }}>{app.message}</p></div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                <span style={{ fontSize: "11px", opacity: 0.3, display: "flex", alignItems: "center", gap: "6px" }}><Calendar size={12} /> {new Date(app.created_at).toLocaleDateString()}</span>
                                <button 
                                    onClick={() => onDelete(app.id)} 
                                    disabled={saving}
                                    style={{ background: "transparent", border: "none", color: "rgba(232,64,64,0.6)", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", transition: "color 0.2s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#E84040")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,64,64,0.6)")}
                                >
                                    {saving ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />} Delete Application
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

function InfoItem({ icon, label, val }: any) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ color: "#C9A96E", marginTop: "2px" }}>{icon}</div>
            <div>
                <p style={{ fontSize: "10px", textTransform: "uppercase", opacity: 0.4, marginBottom: "4px" }}>{label}</p>
                <p style={{ fontSize: "15px", fontWeight: 500 }}>{val}</p>
            </div>
        </div>
    );
}

function ContentView({ 
    activeSection, setActiveSection, siteContent, onContentChange, onSave, onImageUpload,
    programs, onAddProgram, onDeleteProgram, onUpdateProgram, onLocalUpdateProgram,
    testimonials, onAddTestimonial, onDeleteTestimonial, onUpdateTestimonial, onLocalUpdateTestimonial,
    trails, onAddTrail, onDeleteTrail, onUpdateTrail, onLocalUpdateTrail,
    saving, isMobile
}: any) {
    const sections = [
        { id: 'hero', label: 'Hero', icon: <LayoutDashboard size={14} /> },
        { id: 'philosophy', label: 'Philosophy', icon: <QuoteIcon size={14} /> },
        { id: 'founder', label: 'Founder', icon: <User size={14} /> },
        { id: 'programs', label: 'Programs', icon: <Briefcase size={14} /> },
        { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={14} /> },
        { id: 'trails', label: 'Trails', icon: <Mountain size={14} /> },
        { id: 'cta', label: 'CTA', icon: <Tag size={14} /> }
    ];

    return (
        <>
            <div style={{ marginBottom: "48px" }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "42px", fontWeight: 600, marginBottom: "8px" }}>Site Content</h1>
                <p style={{ fontSize: "14px", color: "rgba(242,238,232,0.5)" }}>Manage the landing page structure and content.</p>
            </div>

            <div style={{ 
                display: "flex", 
                gap: "8px", 
                marginBottom: "40px", 
                overflowX: "auto", 
                paddingBottom: "10px",
                msOverflowStyle: "none", 
                scrollbarWidth: "none"
            }}>
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                <div className="hide-scrollbar" style={{ display: "flex", gap: "8px" }}>
                    {sections.map(s => (
                        <button key={s.id} onClick={() => setActiveSection(s.id)} style={{ 
                            padding: "10px 20px", 
                            borderRadius: "4px", 
                            border: "1px solid rgba(255,255,255,0.05)", 
                            background: activeSection === s.id ? "#C9A96E" : "rgba(255,255,255,0.03)", 
                            color: activeSection === s.id ? "#0A0906" : "#F2EEE8", 
                            cursor: "pointer", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "8px", 
                            fontSize: "12px", 
                            fontWeight: 500, 
                            transition: "all 0.2s",
                            whiteSpace: "nowrap"
                        }}>
                            {s.icon} {s.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", padding: isMobile ? "24px" : "40px" }}>
                <SectionPreview 
                    section={activeSection} 
                    data={siteContent} 
                    items={
                        activeSection === 'programs' ? programs : 
                        activeSection === 'testimonials' ? testimonials : 
                        activeSection === 'trails' ? trails : []
                    }
                    isMobile={isMobile}
                />
                {activeSection === 'hero' && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        <StarterContentHint section="Hero" hasData={Object.keys(siteContent).some(k => k.startsWith('hero:'))} />
                        <EditorField label="Eyebrow" value={siteContent['hero:eyebrow']?.content || ''} onChange={(v: string) => onContentChange('hero', 'eyebrow', v)} onSave={() => onSave('hero', 'eyebrow')} saving={saving} />
                        <EditorField label="Headline" value={siteContent['hero:headline']?.content || ''} onChange={(v: string) => onContentChange('hero', 'headline', v)} onSave={() => onSave('hero', 'headline')} saving={saving} />
                        <EditorField label="Headline Italic" value={siteContent['hero:headline_italic']?.content || ''} onChange={(v: string) => onContentChange('hero', 'headline_italic', v)} onSave={() => onSave('hero', 'headline_italic')} saving={saving} />
                        <EditorField label="Tagline" textarea value={siteContent['hero:tagline']?.content || ''} onChange={(v: string) => onContentChange('hero', 'tagline', v)} onSave={() => onSave('hero', 'tagline')} saving={saving} />
                        <ImageField 
                            label="Hero Image" 
                            description="This is the main large background image at the very top of your home page."
                            url={siteContent['hero:image']?.image_url} 
                            onUpload={(f: File) => onImageUpload('hero', 'image', f)} 
                            onSelectLibrary={(url: string) => onContentChange('hero', 'image', url, true)}
                            saving={saving} 
                            isMobile={isMobile}
                        />
                        <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
                            <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "12px" }}>Background Overlay Opacity</label>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <input 
                                    type="range" min="0" max="100" 
                                    value={siteContent['hero:overlay_opacity']?.content || '50'} 
                                    onChange={(e) => onContentChange('hero', 'overlay_opacity', e.target.value)}
                                    style={{ flex: 1, accentColor: "#C9A96E", cursor: "pointer" }}
                                />
                                <span style={{ fontSize: "14px", fontWeight: 600, color: "#C9A96E", width: "40px" }}>{siteContent['hero:overlay_opacity']?.content || '50'}%</span>
                                <button onClick={() => onSave('hero', 'overlay_opacity')} disabled={saving} style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#C9A96E", padding: "8px 16px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'philosophy' && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        <StarterContentHint section="Philosophy" hasData={Object.keys(siteContent).some(k => k.startsWith('philosophy:'))} />
                        <EditorField label="Main Quote" textarea value={siteContent['philosophy:quote']?.content || ''} onChange={(v: string) => onContentChange('philosophy', 'quote', v)} onSave={() => onSave('philosophy', 'quote')} saving={saving} />
                        <EditorField label="Himalaya Quote" textarea value={siteContent['philosophy:himalaya_quote']?.content || ''} onChange={(v: string) => onContentChange('philosophy', 'himalaya_quote', v)} onSave={() => onSave('philosophy', 'himalaya_quote')} saving={saving} />
                         <ImageField 
                            label="Break Image" 
                            description="The large panoramic image that appears between the 'Philosophy' and 'Founder' sections."
                            url={siteContent['philosophy:image']?.image_url} 
                            onUpload={(f: File) => onImageUpload('philosophy', 'image', f)} 
                            onSelectLibrary={(url: string) => onContentChange('philosophy', 'image', url, true)}
                            saving={saving} 
                            isMobile={isMobile}
                        />
                    </div>
                )}

                {activeSection === 'founder' && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        <StarterContentHint section="Founder" hasData={Object.keys(siteContent).some(k => k.startsWith('founder:'))} />
                        <EditorField label="Headline" value={siteContent['founder:headline']?.content || ''} onChange={(v: string) => onContentChange('founder', 'headline', v)} onSave={() => onSave('founder', 'headline')} saving={saving} />
                        <EditorField label="Headline Italic" value={siteContent['founder:headline_italic']?.content || ''} onChange={(v: string) => onContentChange('founder', 'headline_italic', v)} onSave={() => onSave('founder', 'headline_italic')} saving={saving} />
                        <EditorField label="Story" textarea value={siteContent['founder:story']?.content || ''} onChange={(v: string) => onContentChange('founder', 'story', v)} onSave={() => onSave('founder', 'story')} saving={saving} />
                        <EditorField label="Quote" textarea value={siteContent['founder:quote']?.content || ''} onChange={(v: string) => onContentChange('founder', 'quote', v)} onSave={() => onSave('founder', 'quote')} saving={saving} />
                         <ImageField 
                            label="Profile Image" 
                            description="The portrait photo of the founder shown in the 'Behind the Trails' section."
                            url={siteContent['founder:image']?.image_url} 
                            onUpload={(f: File) => onImageUpload('founder', 'image', f)} 
                            onSelectLibrary={(url: string) => onContentChange('founder', 'image', url, true)}
                            saving={saving} 
                            isMobile={isMobile}
                        />
                         <ImageField 
                            label="Secondary Image" 
                            description="The secondary floating image (forest/trail) that appears next to the founder's story."
                            url={siteContent['founder:secondary_image']?.image_url} 
                            onUpload={(f: File) => onImageUpload('founder', 'secondary_image', f)} 
                            onSelectLibrary={(url: string) => onContentChange('founder', 'secondary_image', url, true)}
                            saving={saving} 
                            isMobile={isMobile}
                        />
                    </div>
                )}

                {activeSection === 'programs' && (
                    <ListView items={programs} onAdd={onAddProgram} onDelete={onDeleteProgram} onUpdate={onUpdateProgram} onLocalUpdate={onLocalUpdateProgram} saving={saving} tableName="programs" isMobile={isMobile}
                        renderEditor={(item: any, update: (upd: any) => void) => (
                            <div style={{ display: "grid", gap: "16px" }}>
                                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" }}>
                                    <MiniInput label="Tier (e.g. 01)" value={item.tier} onChange={(v: string) => update({ tier: v })} />
                                    <MiniInput label="Name" value={item.name} onChange={(v: string) => update({ name: v })} />
                                </div>
                                <MiniInput label="Subtitle" value={item.subtitle} onChange={(v: string) => update({ subtitle: v })} />
                                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" }}>
                                    <MiniInput label="Price" value={item.price} onChange={(v: string) => update({ price: v })} />
                                    <MiniInput label="Tag" value={item.tag} onChange={(v: string) => update({ tag: v })} />
                                </div>
                                <MiniInput label="Description" textarea value={item.description} onChange={(v: string) => update({ description: v })} />
                            </div>
                        )}
                    />
                )}

                {activeSection === 'testimonials' && (
                    <ListView items={testimonials} onAdd={onAddTestimonial} onDelete={onDeleteTestimonial} onUpdate={onUpdateTestimonial} onLocalUpdate={onLocalUpdateTestimonial} saving={saving} tableName="testimonials" isMobile={isMobile}
                        renderEditor={(item: any, update: (upd: any) => void) => (
                            <div style={{ display: "grid", gap: "16px" }}>
                                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" }}>
                                    <MiniInput label="Name" value={item.name} onChange={(v: string) => update({ name: v })} />
                                    <MiniInput label="Country" value={item.country} onChange={(v: string) => update({ country: v })} />
                                </div>
                                <MiniInput label="Quote" textarea value={item.quote} onChange={(v: string) => update({ quote: v })} />
                                <MiniInput label="Program Taken" value={item.program} onChange={(v: string) => update({ program: v })} />
                            </div>
                        )}
                    />
                )}

                {activeSection === 'trails' && (
                    <ListView items={trails} onAdd={onAddTrail} onDelete={onDeleteTrail} onUpdate={onUpdateTrail} onLocalUpdate={onLocalUpdateTrail} saving={saving} tableName="trails" isMobile={isMobile}
                        renderEditor={(item: any, update: (upd: any) => void) => (
                            <div style={{ display: "grid", gap: "16px" }}>
                                <MiniInput label="Trail Name" value={item.name} onChange={(v: string) => update({ name: v })} />
                                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" }}>
                                    <MiniInput label="Location" value={item.location} onChange={(v: string) => update({ location: v })} />
                                    <MiniInput label="Elevation" value={item.elevation} onChange={(v: string) => update({ elevation: v })} />
                                </div>
                                <MiniInput label="Description" textarea value={item.description} onChange={(v: string) => update({ description: v })} />
                                 <ImageField 
                                    label="Trail Image" 
                                    description="The cover photo for this specific trail card."
                                    url={item.image} 
                                    onUpload={async (f: File) => {
                                        const url = await uploadImage(f, 'trails');
                                        if (url) update({ image: url });
                                    }} 
                                    onSelectLibrary={(url: string) => update({ image: url })}
                                    saving={saving}
                                    isMobile={isMobile} 
                                />
                            </div>
                        )}
                    />
                )}

                {activeSection === 'cta' && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        <StarterContentHint section="CTA" hasData={Object.keys(siteContent).some(k => k.startsWith('cta:'))} />
                        <EditorField label="Headline" value={siteContent['cta:headline']?.content || ''} onChange={(v: string) => onContentChange('cta', 'headline', v)} onSave={() => onSave('cta', 'headline')} saving={saving} />
                        <EditorField label="Subtext" textarea value={siteContent['cta:subtext']?.content || ''} onChange={(v: string) => onContentChange('cta', 'subtext', v)} onSave={() => onSave('cta', 'subtext')} saving={saving} />
                    </div>
                )}
            </div>
        </>
    );
}

function ListView({ items, onAdd, onDelete, onUpdate, onLocalUpdate, renderEditor, saving, tableName, isMobile }: any) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>Manage Items ({items.length})</h3>
                <button onClick={onAdd} style={{ background: "#C9A96E", color: "#0A0906", border: "none", padding: "8px 16px", borderRadius: "4px", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Plus size={14} /> Add New
                </button>
            </div>

            {items.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", background: "rgba(201,169,110,0.05)", border: "1px dashed rgba(201,169,110,0.2)", borderRadius: "8px" }}>
                    <p style={{ color: "#C9A96E", fontSize: "14px", marginBottom: "8px" }}>No items found in your database.</p>
                    <p style={{ fontSize: "12px", opacity: 0.6, maxWidth: "450px", margin: "0 auto", lineHeight: "1.6" }}>
                        The website is currently showing "Starter" content from the code. 
                        To edit it, add your first item above or run the <b>seed_starter_content.sql</b> script in your Supabase SQL Editor to import the defaults.
                    </p>
                </div>
            )}
            
            <div style={{ display: "grid", gap: "24px" }}>
                {items.map((item: any) => (
                    <div key={item.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: isMobile ? "16px" : "24px" }}>
                        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "start", gap: isMobile ? "20px" : "0", marginBottom: "24px" }}>
                            <div style={{ flex: 1 }}>{renderEditor(item, (upd: any) => onLocalUpdate(item.id, upd))}</div>
                            <button onClick={() => onDelete(item.id)} style={{ background: "rgba(232,64,64,0.1)", border: "1px solid rgba(232,64,64,0.2)", color: "#E84040", padding: "12px", borderRadius: "4px", marginLeft: isMobile ? "0" : "20px", height: "fit-content", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Trash2 size={16} /> {isMobile && <span style={{ marginLeft: "8px", fontSize: "12px" }}>Delete Item</span>}
                            </button>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <button 
                                onClick={() => onUpdate(tableName, item.id)} 
                                disabled={saving}
                                style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.2)", color: "#C9A96E", padding: "12px 16px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: isMobile ? "100%" : "auto", marginLeft: "auto" }}
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save Changes
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StarterContentHint({ section, hasData }: { section: string, hasData: boolean }) {
    if (hasData) return null;
    return (
        <div style={{ padding: "20px", background: "rgba(201,169,110,0.05)", border: "1px dashed rgba(201,169,110,0.2)", borderRadius: "8px", marginBottom: "8px" }}>
            <p style={{ color: "#C9A96E", fontSize: "13px", marginBottom: "4px" }}>{section} content is currently empty in database.</p>
            <p style={{ fontSize: "11px", opacity: 0.6, lineHeight: "1.5" }}>
                The website is showing "Starter" content. To edit it, run the <b>seed_starter_content.sql</b> script in Supabase or fill in the fields below and click save.
            </p>
        </div>
    );
}

function SectionPreview({ section, data, items, isMobile }: any) {
    const PRAYER_FLAG_COLORS = ["#3B7DD8", "#E8E4DC", "#E84040", "#4CAF73", "#F5C842"];

    return (
        <div style={{ marginBottom: "40px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#0A0906", position: "relative" }}>
            <div style={{ padding: "12px 20px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, opacity: 0.5 }}>Live Mock Preview</span>
                <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                </div>
            </div>

            <div style={{ position: "relative", minHeight: "300px", width: "100%", overflow: "hidden" }}>
                {section === 'hero' && (
                    <div style={{ height: "400px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "40px", position: "relative" }}>
                        <img src={data['hero:image']?.image_url || 'https://images.unsplash.com/photo-1729455192378-a3347584fb71?auto=format&fit=crop&q=80'} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ 
                            position: "absolute", 
                            inset: 0, 
                            background: `linear-gradient(to bottom, rgba(10,9,6,${(data['hero:overlay_opacity']?.content || 55) / 100}) 0%, rgba(10,9,6,0.2) 40%, rgba(10,9,6,0.65) 80%, rgba(10,9,6,0.95) 100%)` 
                        }} />
                        <div style={{ position: "relative", zIndex: 1 }}>
                            <p style={{ color: "#C9A96E", fontSize: isMobile ? "9px" : "10px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px" }}>{data['hero:eyebrow']?.content || "NEPAL · HIMALAYA · TRAIL"}</p>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "42px", color: "#F2EEE8", lineHeight: 1.1, marginBottom: "8px" }}>{data['hero:headline']?.content || "Ride with Rhythm."}</h1>
                            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "32px" : "42px", fontStyle: "italic", fontWeight: 300, color: "#F2EEE8", lineHeight: 1.1, marginBottom: "20px" }}>{data['hero:headline_italic']?.content || "Flow with the Mountain."}</h1>
                            <p style={{ fontSize: isMobile ? "12px" : "14px", color: "rgba(242,238,232,0.7)", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>{data['hero:tagline']?.content || "Elite coaching in the heart of the Himalayas."}</p>
                        </div>
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", display: "flex" }}>
                            {PRAYER_FLAG_COLORS.map((c, i) => <div key={i} style={{ flex: 1, background: c, opacity: 0.5 }} />)}
                        </div>
                    </div>
                )}

                {section === 'philosophy' && (
                    <div style={{ padding: "60px 40px", textAlign: "center", position: "relative", background: "#0A0906" }}>
                        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                            <QuoteIcon size={24} style={{ color: "#C9A96E", opacity: 0.3, marginBottom: "24px" }} />
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontStyle: "italic", lineHeight: 1.6, color: "#F2EEE8", marginBottom: "32px" }}>
                                "{data['philosophy:quote']?.content || "The trail is not just a path—it is a conversation between the rider and the mountain."}"
                            </p>
                            <img src={data['philosophy:image']?.image_url || 'https://images.unsplash.com/photo-1544191714-8011cd1af2b0?auto=format&fit=crop&q=80'} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px", marginBottom: "32px" }} />
                            <p style={{ fontSize: "16px", color: "rgba(242,238,232,0.6)", lineHeight: 1.8 }}>
                                {data['philosophy:himalaya_quote']?.content || "In the vastness of the Himalayas, we find our rhythm."}
                            </p>
                        </div>
                    </div>
                )}

                {section === 'founder' && (
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
                        gap: isMobile ? "24px" : "40px", 
                        padding: isMobile ? "30px 20px" : "60px 40px", 
                        background: "#0E0D0A" 
                    }}>
                         <div style={{ height: isMobile ? "250px" : "400px", borderRadius: "4px", overflow: "hidden", position: "relative" }}>
                            <img src={data['founder:image']?.image_url || 'https://images.unsplash.com/photo-1598124838183-960605bc93c3?auto=format&fit=crop&q=80'} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            {!isMobile && (
                                <div style={{ 
                                    position: "absolute", 
                                    bottom: "-20px", 
                                    right: "-20px", 
                                    width: "150px", 
                                    height: "200px", 
                                    borderRadius: "4px", 
                                    overflow: "hidden", 
                                    border: "2px solid #0E0D0A",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                                }}>
                                    <img src={data['founder:secondary_image']?.image_url || 'https://images.unsplash.com/photo-1760233470659-5151016f3453?auto=format&fit=crop&q=80'} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                </div>
                            )}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "24px" : "32px", color: "#F2EEE8", marginBottom: "4px" }}>{data['founder:headline']?.content || "The Spirit of Laya."}</h2>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "24px" : "32px", fontStyle: "italic", fontWeight: 300, color: "#C9A96E", marginBottom: "24px" }}>{data['founder:headline_italic']?.content || "Meet Your Guide."}</h2>
                            <p style={{ fontSize: "13px", color: "rgba(242,238,232,0.6)", lineHeight: 1.8, marginBottom: "24px" }}>{data['founder:story']?.content || "A story of passion and the trails."}</p>
                            <div style={{ paddingLeft: "20px", borderLeft: "2px solid #C9A96E" }}>
                                <p style={{ fontStyle: "italic", color: "#C9A96E" }}>"{data['founder:quote']?.content || "Riding is living."}"</p>
                            </div>
                        </div>
                    </div>
                )}

                {section === 'programs' && (
                    <div style={{ padding: isMobile ? "30px 20px" : "60px 40px", background: "#0A0906" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                            {items.map((item: any, i: number) => (
                                <div key={i} style={{ padding: "24px", border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
                                    <span style={{ color: "#C9A96E", fontSize: "10px", fontWeight: 700 }}>{item.tier || "01"}</span>
                                    <h4 style={{ fontSize: "18px", color: "#F2EEE8", margin: "8px 0" }}>{item.name}</h4>
                                    <p style={{ fontSize: "12px", opacity: 0.5 }}>{item.subtitle}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {section === 'testimonials' && (
                    <div style={{ padding: "60px 40px", background: "#0E0D0A", textAlign: "center" }}>
                        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                            {items[0] && (
                                <>
                                    <Star size={16} style={{ color: "#C9A96E" }} />
                                    <p style={{ fontStyle: "italic", fontSize: "18px", margin: "20px 0" }}>"{items[0].quote}"</p>
                                    <p style={{ fontWeight: 600 }}>{items[0].name}</p>
                                    <p style={{ fontSize: "12px", opacity: 0.5 }}>{items[0].country}</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {section === 'trails' && (
                    <div style={{ padding: isMobile ? "30px 20px" : "60px 40px", background: "#0A0906" }}>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
                            {items.slice(0, 2).map((item: any, i: number) => (
                                <div key={i} style={{ borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div style={{ height: "160px", background: "#111", position: "relative" }}>
                                        {item.image && <img src={item.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                                    </div>
                                    <div style={{ padding: "20px" }}>
                                        <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>{item.name}</h4>
                                        <div style={{ display: "flex", gap: "12px", fontSize: "11px", opacity: 0.5 }}>
                                            <span>{item.location}</span>
                                            <span>{item.elevation}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {section === 'cta' && (
                    <div style={{ padding: isMobile ? "60px 20px" : "80px 40px", textAlign: "center", background: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1544191714-8011cd1af2b0?auto=format&fit=crop&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isMobile ? "28px" : "36px", color: "#F2EEE8", marginBottom: "16px" }}>{data['cta:headline']?.content || "Ready to find your Laya?"}</h2>
                        <p style={{ fontSize: "14px", color: "rgba(242,238,232,0.8)", maxWidth: "400px", margin: "0 auto 32px" }}>{data['cta:subtext']?.content || "Contact us to plan your Himalayan adventure."}</p>
                        <button style={{ background: "#C9A96E", color: "#0A0906", border: "none", padding: "12px 32px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Get Started</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function MiniInput({ label, value, onChange, textarea }: any) {
    return (
        <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "10px", textTransform: "uppercase", opacity: 0.4, marginBottom: "6px" }}>{label}</label>
            {textarea ? (
                <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", padding: "10px", color: "#fff", fontSize: "13px", minHeight: "80px", outline: "none" }} />
            ) : (
                <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", padding: "10px", color: "#fff", fontSize: "13px", outline: "none" }} />
            )}
        </div>
    );
}

function EditorField({ label, value, onChange, onSave, textarea, saving, isMobile }: any) {
    return (
        <div>
            <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "12px" }}>{label}</label>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" }}>
                {textarea ? (
                    <textarea value={value} onChange={(e) => onChange(e.target.value)} style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", padding: "16px", color: "#F2EEE8", fontFamily: "inherit", fontSize: "14px", lineHeight: "1.6", minHeight: "100px", outline: "none" }} />
                ) : (
                    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px", padding: "14px 16px", color: "#F2EEE8", fontSize: "14px", outline: "none" }} />
                )}
                <button onClick={onSave} disabled={saving} style={{ background: "#C9A96E", color: "#0A0906", border: "none", borderRadius: "2px", width: isMobile ? "100%" : "50px", height: isMobile ? "48px" : "auto", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <>{isMobile && <span style={{ marginRight: "8px", fontWeight: 600 }}>Save Changes</span>}<Save size={18} /></>}
                </button>
            </div>
        </div>
    );
}

function ImageField({ label, url, description, onUpload, onSelectLibrary, saving, isMobile }: any) {
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showLibrary, setShowLibrary] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const handleConfirmUpload = async () => {
        if (selectedFile) {
            await onUpload(selectedFile);
            setPreview(null);
            setSelectedFile(null);
        }
    };

    const handleLibrarySelect = (imageUrl: string) => {
        onSelectLibrary(imageUrl);
        setShowLibrary(false);
    };

    const displayUrl = preview || url;

    return (
        <div style={{ padding: isMobile ? "16px" : "24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px" }}>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: "20px", marginBottom: "20px" }}>
                <div>
                    <label style={{ display: "block", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "4px" }}>{label}</label>
                    <p style={{ fontSize: "13px", opacity: 0.6 }}>{description}</p>
                </div>
                
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button 
                        onClick={() => setShowLibrary(true)}
                        style={{ background: "rgba(201,169,110,0.1)", color: "#C9A96E", border: "1px solid rgba(201,169,110,0.2)", padding: "8px 16px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                    >
                        <Folders size={14} /> Library
                    </button>

                    {preview ? (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button 
                                onClick={() => { setPreview(null); setSelectedFile(null); }}
                                style={{ background: "rgba(232,64,64,0.1)", color: "#E84040", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmUpload}
                                disabled={saving}
                                style={{ background: "#C9A96E", color: "#0A0906", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                            >
                                {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />} Confirm
                            </button>
                        </div>
                    ) : (
                        <label style={{ background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                            <ImageIcon size={14} /> Local Upload
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                        </label>
                    )}
                </div>
            </div>

            {displayUrl && (
                <div style={{ position: "relative", width: "100%", height: "200px", borderRadius: "4px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <img src={displayUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.7)", padding: "8px 12px", fontSize: "10px", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {displayUrl}
                    </div>
                </div>
            )}

            {showLibrary && (
                <MediaLibrary onClose={() => setShowLibrary(false)} onSelect={handleLibrarySelect} />
            )}
        </div>
    );
}

function MediaLibrary({ onClose, onSelect }: { onClose: () => void, onSelect: (url: string) => void }) {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const { data: siteContentFiles } = await supabase.storage.from('site-assets').list('site-content');
            const { data: trailsFiles } = await supabase.storage.from('site-assets').list('trails');

            const allImages: any[] = [];

            if (siteContentFiles) {
                siteContentFiles.forEach(f => {
                    if (f.name !== '.emptyFolderPlaceholder') {
                        allImages.push({
                            name: f.name,
                            url: supabase.storage.from('site-assets').getPublicUrl(`site-content/${f.name}`).data.publicUrl
                        });
                    }
                });
            }

            if (trailsFiles) {
                trailsFiles.forEach(f => {
                    if (f.name !== '.emptyFolderPlaceholder') {
                        allImages.push({
                            name: f.name,
                            url: supabase.storage.from('site-assets').getPublicUrl(`trails/${f.name}`).data.publicUrl
                        });
                    }
                });
            }

            setImages(allImages);
        } catch (err) {
            console.error("Failed to fetch library images:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div style={{ background: "#0E0D0A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", width: "100%", maxWidth: "800px", maxHeight: "80vh", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 600 }}>Media Library</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", color: "#666", cursor: "pointer" }}><X size={20} /></button>
                </div>

                <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}><Loader2 className="animate-spin" size={24} color="#C9A96E" /></div>
                    ) : images.length === 0 ? (
                        <p style={{ textAlign: "center", opacity: 0.5, padding: "40px" }}>No images found in storage.</p>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "16px" }}>
                            {images.map((img, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => onSelect(img.url)}
                                    style={{ background: "rgba(255,255,255,0.02)", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", transition: "transform 0.2s" }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <div style={{ height: "120px" }}>
                                        <img src={img.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div style={{ padding: "8px", fontSize: "10px", opacity: 0.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                        {img.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
