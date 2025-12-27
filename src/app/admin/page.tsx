"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Briefcase, Users, MessageSquare, Loader2 } from "lucide-react";

type Freelancer = {
    id: string;
    name: string;
    email: string;
    mobile: string;
    portfolio?: string;
    publicProfile?: string;
    createdAt?: Timestamp;
};

type ContactLead = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt?: Timestamp;
};

type Job = {
    id: string;
    title: string;
    department: string;
    type: string;
    location: string;
    createdAt?: Timestamp;
};

export default function AdminDashboardPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [loadingPost, setLoadingPost] = useState(false);

    // Data States
    const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
    const [contacts, setContacts] = useState<ContactLead[]>([]);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    // Job Form State
    const [editingJobId, setEditingJobId] = useState<string | null>(null);
    const [job, setJob] = useState({
        title: "",
        department: "",
        type: "Full-time",
        location: "Remote"
    });

    // Auth Handler
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") {
            setIsAuthenticated(true);
            fetchData();
        } else {
            alert("Incorrect Password");
        }
    };

    // Fetch Data
    const fetchData = async () => {
        setLoadingData(true);
        try {
            // Fetch Freelancers
            const freeQuery = query(collection(db, "freelancers"), orderBy("createdAt", "desc"));
            const freeSnap = await getDocs(freeQuery);
            const freeList: Freelancer[] = [];
            freeSnap.forEach(doc => freeList.push({ id: doc.id, ...doc.data() } as Freelancer));
            setFreelancers(freeList);

            // Fetch Contacts
            const contactQuery = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
            const contactSnap = await getDocs(contactQuery);
            const contactList: ContactLead[] = [];
            contactSnap.forEach(doc => contactList.push({ id: doc.id, ...doc.data() } as ContactLead));
            setContacts(contactList);

            // Fetch Jobs
            const jobQuery = query(collection(db, "jobs"), orderBy("createdAt", "desc"));
            const jobSnap = await getDocs(jobQuery);
            const jobList: Job[] = [];
            jobSnap.forEach(doc => jobList.push({ id: doc.id, ...doc.data() } as Job));
            setJobs(jobList);

        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoadingData(false);
        }
    };

    // Job Post/Update Handler
    const handleJobSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingPost(true);
        try {
            if (editingJobId) {
                // Update existing job
                const jobRef = doc(db, "jobs", editingJobId);
                await updateDoc(jobRef, {
                    ...job,
                    updatedAt: new Date()
                });
                alert("Job updated successfully!");
                setEditingJobId(null);
            } else {
                // Create new job
                await addDoc(collection(db, "jobs"), {
                    ...job,
                    createdAt: new Date()
                });
                alert("Job posted successfully!");
            }

            setJob({ title: "", department: "", type: "Full-time", location: "Remote" });
            fetchData(); // Refresh list
        } catch (error) {
            console.error("Error saving job: ", error);
            alert("Error saving job.");
        } finally {
            setLoadingPost(false);
        }
    };

    const handleEditJob = (jobToEdit: Job) => {
        setJob({
            title: jobToEdit.title,
            department: jobToEdit.department,
            type: jobToEdit.type,
            location: jobToEdit.location
        });
        setEditingJobId(jobToEdit.id);
        // Switch to form tab or scroll to form if needed, but here they are on same tab
    };

    const handleDeleteJob = async (jobId: string) => {
        if (!confirm("Are you sure you want to delete this job?")) return;

        try {
            await deleteDoc(doc(db, "jobs", jobId));
            alert("Job deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Error deleting job");
        }
    };

    const handleCancelEdit = () => {
        setEditingJobId(null);
        setJob({ title: "", department: "", type: "Full-time", location: "Remote" });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Lock className="w-5 h-5" /> Admin Dashboard
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Enter Admin Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter access key"
                                />
                            </div>
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 px-4 pb-12">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
                </div>

                <Tabs defaultValue="leads" className="w-full space-y-6">
                    <TabsList className="grid w-full grid-cols-3 h-12">
                        <TabsTrigger value="leads" className="text-base"><Users className="w-4 h-4 mr-2" /> Client Leads</TabsTrigger>
                        <TabsTrigger value="freelancers" className="text-base"><Briefcase className="w-4 h-4 mr-2" /> Freelancers</TabsTrigger>
                        <TabsTrigger value="jobs" className="text-base"><MessageSquare className="w-4 h-4 mr-2" /> Manage Jobs</TabsTrigger>
                    </TabsList>

                    {/* Client Leads Tab */}
                    <TabsContent value="leads">
                        <Card>
                            <CardHeader>
                                <CardTitle>Client Inquiries ({contacts.length})</CardTitle>
                                <CardDescription>Recent messages from the &quot;Contact Us&quot; form.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loadingData ? (
                                    <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                                ) : contacts.length > 0 ? (
                                    <div className="space-y-4">
                                        {contacts.map(contact => (
                                            <div key={contact.id} className="p-4 border rounded-lg bg-card/50 hover:bg-muted/50 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                                                        <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">{contact.email}</a>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                        {contact.createdAt?.toDate ? contact.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground bg-muted/30 p-3 rounded-md text-sm mt-2">{contact.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">No inquiries yet.</div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Freelancers Tab */}
                    <TabsContent value="freelancers">
                        <Card>
                            <CardHeader>
                                <CardTitle>Registered Freelancers ({freelancers.length})</CardTitle>
                                <CardDescription>Talent pool applications.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loadingData ? (
                                    <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                                ) : freelancers.length > 0 ? (
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {freelancers.map(freelancer => (
                                            <div key={freelancer.id} className="p-4 border rounded-lg bg-card/50 hover:bg-muted/50 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold">{freelancer.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{freelancer.mobile}</p>
                                                        <a href={`mailto:${freelancer.email}`} className="text-sm text-primary hover:underline block mt-1">{freelancer.email}</a>
                                                    </div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t flex gap-3 text-sm">
                                                    {freelancer.portfolio && (
                                                        <a href={freelancer.portfolio} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary font-medium">
                                                            View Portfolio
                                                        </a>
                                                    )}
                                                    {freelancer.publicProfile && (
                                                        <a href={freelancer.publicProfile} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                                            Public Profile
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">No freelancers registered yet.</div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Post Job Tab */}
                    <TabsContent value="jobs">
                        <Card>
                            <CardHeader>
                                <CardTitle>{editingJobId ? "Edit Job Position" : "Post a New Job Position"}</CardTitle>
                                <CardDescription>{editingJobId ? "Update the details of the job position." : "Add a new role to the Careers page."}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleJobSubmit} className="space-y-6 max-w-2xl mx-auto py-4">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Job Title</Label>
                                            <Input
                                                id="title"
                                                value={job.title}
                                                onChange={(e) => setJob({ ...job, title: e.target.value })}
                                                placeholder="e.g. Senior Product Designer"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="dept">Department</Label>
                                            <Input
                                                id="dept"
                                                value={job.department}
                                                onChange={(e) => setJob({ ...job, department: e.target.value })}
                                                placeholder="e.g. Design, Engineering"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="type">Type</Label>
                                                <select
                                                    id="type"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    value={job.type}
                                                    onChange={(e) => setJob({ ...job, type: e.target.value })}
                                                >
                                                    <option value="Full-time">Full-time</option>
                                                    <option value="Part-time">Part-time</option>
                                                    <option value="Contract">Contract</option>
                                                    <option value="Freelance">Freelance</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    value={job.location}
                                                    onChange={(e) => setJob({ ...job, location: e.target.value })}
                                                    placeholder="e.g. Remote, New York"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button type="submit" className="flex-1" disabled={loadingPost}>
                                            {loadingPost ? (editingJobId ? "Updating..." : "Posting...") : (editingJobId ? "Update Job" : "Post Job")}
                                        </Button>
                                        {editingJobId && (
                                            <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                                Cancel
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-4">Posted Jobs</h2>
                            {loadingData ? (
                                <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>
                            ) : jobs.length > 0 ? (
                                <div className="space-y-4">
                                    {jobs.map(jobItem => (
                                        <Card key={jobItem.id} className="bg-card/50">
                                            <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                <div>
                                                    <h3 className="font-semibold text-lg">{jobItem.title}</h3>
                                                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                                                        <span className="bg-muted px-2 py-0.5 rounded">{jobItem.department}</span>
                                                        <span className="bg-muted px-2 py-0.5 rounded">{jobItem.type}</span>
                                                        <span className="bg-muted px-2 py-0.5 rounded">{jobItem.location}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleEditJob(jobItem)}>
                                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => handleDeleteJob(jobItem.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">No jobs posted yet.</div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
