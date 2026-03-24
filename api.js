import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const normalizedApiUrl = rawApiUrl.replace(/\/$/, "");
const baseURL = normalizedApiUrl.endsWith("/api")
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
})
//class
//subjects //
export const addSubjectRoute = (classId, subjectName, order) => api.post(`/subjects/${classId}/add-subjects`, {
    subjectName, order,
});
export const subjectRoute = (classId) => api.get(`/subjects?classId=${classId}`)
//chapters
export const addChapterRoute = (subjectId) => api.post(`/subjects/${subjectId}/chapters/add-chapters`)
export const ChapterRoute = (subjectId) => api.get(`/subjects/${subjectId}/chapters`)
export const deleteChapterRoute = (subjectId, chapterId) => api.delete(`/subjects/${subjectId}/chapters/${chapterId}/delete`)
//sections
export const addSectionRoute = (subjectId, chapterId, sections) => api.post(`/subjects/${subjectId}/chapters/${chapterId}/sections/add-section`, sections)
export const sectionRoute = (subjectId, chapterId) => api.get(`/subjects/${subjectId}/chapters/${chapterId}/sections`)
export const singleSectionRoute = (subjectId, chapterId, sectionId) => api.get(`/${subjectId}/chapters/${chapterId}/sections/${sectionId}`)
export const editSectionRoute = (subjectId, chapterId, sectionId) => api.get(`/subjects/${subjectId}/chapters/${chapterId}/sections/${sectionId}/edit`)
export const updateSectionRoute = (subjectId, chapterId, sectionId, sectionData, order) => api.patch(`/subjects/${subjectId}/chapters/${chapterId}/sections/${sectionId}/edit`, {
    sectionName: sectionData.sectionName,
    sectionContent: sectionData.sectionContent,
    order
});
export const deleteSectionRoute = (subjectId, chapterId, sectionId) => api.delete(`/subjects/${subjectId}/chapters/${chapterId}/sections/${sectionId}/delete`)
