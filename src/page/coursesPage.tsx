import CourseCard from "../components/Course/CourseCard";

export default function CoursesPage() {
  return (
    <div className="flex-1 p-8 bg-[#fcfcfc] w-full h-full">
      <div className="text-4xl"> Courses </div>
      <hr className="border-gray-400 my-6" />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CourseCard
            courseId={2017}
            title="Data Structures & Algorithms in C#"
            instructorName="emad ayman"
            categoryName="Frontend"
            level="Expert"
            rating={4}
            totalDurationMinutes={880}
            totalLessonCount={35}
            price={159.99}
            thumbnailUrl="https://picsum.photos/700/430"
          />

          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={22}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={1320}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={1320}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={1320}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={1320}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={1320}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={1320}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
          <CourseCard
            courseId={101}
            title="Beginner's Guide to Design"
            instructorName="Ronald Richards"
            categoryName="UI/UX Design"
            level="Beginner"
            rating={5}
            totalDurationMinutes={1320}
            totalLessonCount={155}
            price={45.0}
            thumbnailUrl="https://picsum.photos/700/430"
          />
        </div>
      </div>
    </div>
  );
}
