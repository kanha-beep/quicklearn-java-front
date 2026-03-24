import { useEffect, useState } from "react";

import ChapterList from "../Chapters/ChapterList.jsx";
import SectionsList from "../Sections/SectionsList.jsx";
import SectionsSummary from "../Sections/SectionsSummary.jsx";
import { DeleteSection } from "../Sections/SectionsComponents/DeleteSection.js";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api.js";
import { HandleSections } from "../Sections/SectionsComponents/HandleSection.js";
import { HomePageButton } from "../Pages/HomePageButton.jsx";
import { GoToAddChapterButton } from "../Chapters/ChaptersButtons/GoToAddChapterButton.jsx";
import { SubjectCard } from "./SubjectCard.jsx";
import { useChapters } from "../hooks.js";

export default function SubjectPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const { classId } = useParams();

  const [query, setQuery] = useState("");
  const [onClickedSectionId, setOnClickedSectionId] = useState(null);
  const [sectionContent, setSectionContent] = useState(null);
  const [openChapterId, setOpenChapterId] = useState(null);
  const [activeChapterId, setActiveChapterId] = useState("");
  const [sectionsList, setSectionsList] = useState([]);
  const [openSectionId, setOpenSectionId] = useState(null);

  const { chaptersList, chaptersCount, subjectName } = useChapters(subjectId);

  const onOpenClose = (sectionId) => {
    setOnClickedSectionId(sectionId);
  };

  const handleSections = async (chapterIdParam) => {
    HandleSections(
      openChapterId,
      chapterIdParam,
      setOpenChapterId,
      setSectionsList,
      api,
      subjectId,
    );
    setActiveChapterId(chapterIdParam);
  };

  const handleDeleteSection = async (sectionId) => {
    const section = sectionsList.find((s) => s?._id === sectionId);
    const chapterIdForDelete =
      section?.chapter_of_section ||
      activeChapterId ||
      openChapterId ||
      chapterId;

    if (!chapterIdForDelete || !sectionId) {
      console.log("missing chapterId/sectionId for delete", {
        chapterIdForDelete,
        sectionId,
      });
      return;
    }

    DeleteSection(api, subjectId, chapterIdForDelete, sectionId, setSectionsList);
  };

  const onClickId = () => {
    setOnClickedSectionId((p) => !p);
  };

  const [index, setIndex] = useState(0);

  const filtered = chaptersList?.filter((ch) =>
    ch?.chapter_name?.toLowerCase()?.includes(query?.toLowerCase()),
  );

  const next = () => setIndex((index + 1) % filtered.length);
  const prev = () =>
    setIndex((index - 1 + chaptersList.length) % filtered.length);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  const visibleChapter = filtered[index];
  const isPrevDisabled = filtered.length === 0 || index === 0;
  const isNextDisabled = filtered.length === 0 || index === filtered.length - 1;

  return (
    <div className="mx-auto w-full max-w-7xl px-3 pb-4 pt-3 text-slate-900 sm:px-4">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-3 shadow-sm transition hover:shadow-md sm:p-4">
        <SubjectCard subjectName={subjectName} chaptersCount={chaptersCount} />

        <div className="mt-1 sticky top-16 z-20 rounded-xl border border-slate-200 bg-white/95 p-1.5 backdrop-blur">
          <div className="mb-1.5 flex flex-wrap items-center gap-3 text-[11px]">
            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
              Total: {chaptersList.length}
            </span>
            <span className="rounded-full bg-cyan-100 px-3 py-1 font-medium text-cyan-700">
              Filtered: {filtered.length}
            </span>
            {visibleChapter && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">
                Viewing: {index + 1}/{filtered.length}
              </span>
            )}
          </div>

          <div className="ml-auto grid w-fit grid-cols-[auto_auto_9.5rem_auto] items-center gap-1.5">
            <div>
              <button
                className="btn btn-primary btn-sm transition disabled:opacity-50"
                onClick={prev}
                disabled={isPrevDisabled}
              >
                Prev
              </button>
            </div>
            <div>
              <button
                className="btn btn-primary btn-sm transition disabled:opacity-50"
                onClick={next}
                disabled={isNextDisabled}
              >
                Next
              </button>
            </div>

            <div>
              <input
                className="form-control form-control-sm text-xs"
                placeholder="Search chapter"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div>
              <GoToAddChapterButton
                navigate={navigate}
                _id={subjectId}
                classId={classId}
                subjectName={subjectName}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-2 rounded-2xl bg-white p-1 text-slate-900 shadow-sm transition hover:shadow-md">
        <div>
          <ChapterList
            chaptersList={visibleChapter ? [visibleChapter] : []}
            handleSections={handleSections}
            subjectId={subjectId}
            classId={classId}
            subjectName={subjectName}
            onChapterSelect={(chapter) => setActiveChapterId(chapter?._id)}
          />
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-sm transition hover:shadow-md">
          <div>
            <SectionsList
              onClickId={onClickId}
              handleDeleteSection={handleDeleteSection}
              onOpenClose={onOpenClose}
              subjectId={subjectId}
              chapterId={activeChapterId || openChapterId || chapterId}
              sectionsList={sectionsList}
              setSectionContent={setSectionContent}
              openSectionId={openSectionId}
              setOpenSectionId={setOpenSectionId}
              classId={classId}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-sm transition hover:shadow-md">
          <SectionsSummary sectionsList={sectionsList} sectionContent={sectionContent} />
        </div>
      </section>

      <div className="mt-4">
        <HomePageButton navigate={navigate} classId={classId} />
      </div>
    </div>
  );
}
