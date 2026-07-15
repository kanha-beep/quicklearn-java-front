import { useEffect } from "react";
import { useState } from "react";
import { resAddChapter, resAddSection, resAddSubject, resDeleteChapter, resDeleteSection, resEditSection, resGetChapters, resGetSection, resGetSingleSection, resGetSubjects, resUpdateSection } from "./Components/fetchRoutes";

const EMPTY_LIST = [];

export const useSubjects = (classId) => {
    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!classId) {
            setSubjects([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        resGetSubjects(classId)
            .then((data) => setSubjects(data || []))
            .catch((e) => {
                console.log("all subjects error: ", e?.response?.data?.msg || e?.message);
                setSubjects([]);
            })
            .finally(() => setIsLoading(false));
    }, [classId]);

    return { subjects, isLoading };
};
export const useAddSubject = () => {
    return (classId, subjectName, order) => {
        return resAddSubject(classId, subjectName, order);
    };
};

export const useChapters = (subjectId) => {
    const [chapters, setChapters] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!subjectId) {
            setChapters(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        resGetChapters(subjectId)
            .then(setChapters)
            .catch(e => {
                console.log(e);
                setChapters({ chaptersList: [], chapterCount: 0, subjectName: "" });
            })
            .finally(() => setIsLoading(false));
    }, [subjectId]);

    return {
        chaptersList: chapters?.chaptersList || EMPTY_LIST,
        chapterCount: chapters?.chapterCount || 0,
        subjectName: chapters?.subjectName?.subject_name || "",
        isLoading,
    };
};
export const useSections = (subjectId, chapterId) => {
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!subjectId || !chapterId) {
            setSections([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        resGetSection(subjectId, chapterId)
            .then((data) => setSections(data || []))
            .catch(() => setSections([]))
            .finally(() => setIsLoading(false));
    }, [subjectId, chapterId]);

    return { sections, isLoading };
};
export const useSingleSection = () => {
    const [section, setSection] = useState(null);
    return (subjectId, chapterId, sectionId) => {
        console.log("inside hook: ", subjectId, chapterId, sectionId);
        resGetSingleSection(subjectId, chapterId, sectionId).then(setSection);
        return section;
    };
};
export const useAddChapter = () => {
    return (subjectId) => resAddChapter(subjectId);
};

export const useDeleteChapter = () => {
    return (subjectId, chapterId) => resDeleteChapter(subjectId, chapterId);
};
export const useAddSection = () => {
    return (subjectId, chapterId, sections) => resAddSection(subjectId, chapterId, sections);
};

export const useEditSection = () => {
    return (subjectId, chapterId, sectionId) => resEditSection(subjectId, chapterId, sectionId);
};
export const useUpdateSection = () => {
    return (subjectId, chapterId, sectionId, sectionData, order) => resUpdateSection(subjectId, chapterId, sectionId, sectionData, order);
};
export const useDeleteSection = () => {
    return (subjectId, chapterId, sectionId) => resDeleteSection(subjectId, chapterId, sectionId);
};
