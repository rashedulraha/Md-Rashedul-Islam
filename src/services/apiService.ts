import apiClient from "@/lib/axios";

// Project API Calls
export const getProjects = async () => {
  return apiClient.get("/projects");
};

// Auth API Calls
export const forgotPassword = async (email: string) => {
  return apiClient.post("/auth/forgot-password", { email });
};

export const resetPassword = async (data: { email: string; token: string; newPassword: string }) => {
  return apiClient.post("/auth/reset-password", data);
};

export const getProjectById = async (id: string) => {
  return apiClient.get(`/projects/${id}`);
};

export const createProject = async (data: any) => {
  return apiClient.post("/projects", data);
};

export const updateProject = async (id: string, data: any) => {
  return apiClient.patch(`/projects/${id}`, data);
};

export const deleteProject = async (id: string) => {
  return apiClient.delete(`/projects/${id}`);
};

// Skill API Calls
export const getSkills = async () => {
  return apiClient.get("/skills");
};

export const createSkill = async (data: any) => {
  return apiClient.post("/skills", data);
};

export const updateSkill = async (id: string, data: any) => {
  return apiClient.patch(`/skills/${id}`, data);
};

export const deleteSkill = async (id: string) => {
  return apiClient.delete(`/skills/${id}`);
};

// Blog API Calls
export const getBlogs = async () => {
  return apiClient.get("/blogs");
};

export const getBlogBySlug = async (slug: string) => {
  return apiClient.get(`/blogs/${slug}`);
};

export const createBlog = async (data: any) => {
  return apiClient.post("/blogs", data);
};

export const updateBlog = async (id: string, data: any) => {
  return apiClient.patch(`/blogs/${id}`, data);
};

export const deleteBlog = async (id: string) => {
  return apiClient.delete(`/blogs/${id}`);
};

// Certificate API Calls
export const getCertificates = async () => {
  return apiClient.get("/certificates");
};

export const createCertificate = async (data: any) => {
  return apiClient.post("/certificates", data);
};

export const updateCertificate = async (id: string, data: any) => {
  return apiClient.patch(`/certificates/${id}`, data);
};

export const deleteCertificate = async (id: string) => {
  return apiClient.delete(`/certificates/${id}`);
};

// Guestbook API Calls
export const getGuestbookMessages = async () => {
  return apiClient.get("/guestbook");
};

export const createGuestbookMessage = async (data: any) => {
  return apiClient.post("/guestbook", data);
};

export const deleteGuestbookMessage = async (id: string) => {
  return apiClient.delete(`/guestbook/${id}`);
};

// Bucket List API Calls
export const getBucketList = async () => {
  return apiClient.get("/bucket-list");
};

export const createBucketListItem = async (data: any) => {
  return apiClient.post("/bucket-list", data);
};

export const updateBucketListItem = async (id: string, data: any) => {
  return apiClient.patch(`/bucket-list/${id}`, data);
};

export const deleteBucketListItem = async (id: string) => {
  return apiClient.delete(`/bucket-list/${id}`);
};

// Contact Messages API Calls
export const sendContactMessage = async (data: any) => {
  return apiClient.post("/contact-messages", data);
};

export const getContactMessages = async () => {
  return apiClient.get("/contact-messages");
};

export const markContactMessageRead = async (id: string) => {
  return apiClient.patch(`/contact-messages/${id}/read`);
};

export const deleteContactMessage = async (id: string) => {
  return apiClient.delete(`/contact-messages/${id}`);
};

export const replyToContactMessage = async (id: string, replyMessage: string) => {
  return apiClient.post(`/contact-messages/${id}/reply`, { replyMessage });
};

export const summarizeContactMessage = async (id: string) => {
  return apiClient.get(`/contact-messages/${id}/summarize`);
};

export const sendChatbotAIQuery = async (messages: any[]) => {
  return apiClient.post("/chatbot/chat", { messages });
};

// Testimonials API Calls
export const getTestimonials = async () => {
  return apiClient.get("/testimonials");
};

export const createTestimonial = async (data: any) => {
  return apiClient.post("/testimonials", data);
};

export const updateTestimonial = async (id: string, data: any) => {
  return apiClient.patch(`/testimonials/${id}`, data);
};

export const deleteTestimonial = async (id: string) => {
  return apiClient.delete(`/testimonials/${id}`);
};

// Experience API Calls
export const getExperiences = async () => {
  return apiClient.get("/experiences");
};

export const createExperience = async (data: any) => {
  return apiClient.post("/experiences", data);
};

export const updateExperience = async (id: string, data: any) => {
  return apiClient.patch(`/experiences/${id}`, data);
};

export const deleteExperience = async (id: string) => {
  return apiClient.delete(`/experiences/${id}`);
};

// FAQ API Calls
export const getFAQs = async () => {
  return apiClient.get("/faqs");
};

export const createFAQ = async (data: any) => {
  return apiClient.post("/faqs", data);
};

export const updateFAQ = async (id: string, data: any) => {
  return apiClient.patch(`/faqs/${id}`, data);
};

export const deleteFAQ = async (id: string) => {
  return apiClient.delete(`/faqs/${id}`);
};

// Tool API Calls
export const getTools = async () => {
  return apiClient.get("/tools");
};

export const createTool = async (data: any) => {
  return apiClient.post("/tools", data);
};

export const updateTool = async (id: string, data: any) => {
  return apiClient.patch(`/tools/${id}`, data);
};

export const deleteTool = async (id: string) => {
  return apiClient.delete(`/tools/${id}`);
};

// SocialLink API Calls
export const getSocialLinks = async () => {
  return apiClient.get("/social-links");
};

export const createSocialLink = async (data: any) => {
  return apiClient.post("/social-links", data);
};

export const updateSocialLink = async (id: string, data: any) => {
  return apiClient.patch(`/social-links/${id}`, data);
};

export const deleteSocialLink = async (id: string) => {
  return apiClient.delete(`/social-links/${id}`);
};

// Traffic/Analytics API Calls
export const recordVisit = async (path: string) => {
  return apiClient.post("/traffic/record", { path });
};

export const getTrafficStats = async () => {
  return apiClient.get("/traffic/stats");
};
