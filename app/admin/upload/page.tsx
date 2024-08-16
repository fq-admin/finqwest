'use client';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '@/constants';

interface Mcq {
  question: string;
  type: string;
  lessonId?: number;
  order?: number;
}

interface Option {
  text: string;
  correct: boolean;
  challengeId?: number;
}

interface Course {
  id: number;
  title: string;
}

interface Unit {
  id: number;
  title: string;
  courseId: number;
}

interface Lesson {
  id: number;
  title: string;
  unitId: number;
}

const ImportQues: React.FC = () => {
  const [mcqs, setMcqs] = useState<Mcq[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson[]>([]);
  const [lid, setLid] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedMcqs = parseMcqs(text);
      setMcqs(parsedMcqs);
    };

    reader.readAsText(file);
  };

  const parseMcqs = (text: string): Mcq[] => {
    const lines = text.split('\n');
    const parsedMcqs: Mcq[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const [question, ...oplst] = line
        .split(',')
        .reduce(
          (accum, curr) => {
            if (accum.isConcatting) {
              accum.soFar[accum.soFar.length - 1] += ',' + curr;
            } else {
              accum.soFar.push(curr);
            }
            if (curr.split('"').length % 2 === 0) {
              accum.isConcatting = !accum.isConcatting;
            }
            return accum;
          },
          { soFar: [] as string[], isConcatting: false }
        ).soFar;
      if(question==='')continue
      parsedMcqs.push({
        question,
        type: 'SELECT',
      });

      for (let j = 0; j < 4; j++) {
        // let t=(j+1).toString()
        options.push({
          text: oplst[j],
          correct: parseInt(oplst[4])===(j+1),
        });
      }
    }

    return parsedMcqs;
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/api/courses`);
      const data: Course[] = await response.json();
      // console.log(data);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchUnits = async () => {
    try {
      const response = await fetch(`${API_URL}/api/units`);
      const data: Unit[] = await response.json();
      setUnits(data);
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  };

  const fetchLessons = async () => {
    try {
      const response = await fetch(`${API_URL}/api/lessons`);
      const data: Lesson[] = await response.json();
      setLessons(data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchLessons();
    fetchUnits();
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (lid === -1) {
      toast.error('All fields are required');
      return;
    }
    setIsLoading(true);
    let success = true;
    for (let i = 0; i < mcqs.length; i++) {
      const data = { ...mcqs[i], lessonId: lid, order: i + 1 };
      // console.log(data)
      if(data.question==='')continue
      const response = await fetch(`${API_URL}/api/challenges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const responseData = await response.json(); // Parse the response as JSON
        const newRecordId = responseData.id; // Access the 'id' field of the inserted record
        // console.log('New Record ID:', newRecordId);
        // console.log(typeof(newRecordId))
        for(let j=4*i;j<4*i+4;j++){
          let opt = options[j]
          opt.challengeId=newRecordId
          // console.log(opt)
          if(opt.text==='')continue
          // if(opt.question==='')continue
          const response = await fetch(`${API_URL}/api/challengeOptions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(opt),
          });
          if (!response.ok) {
            console.error('Failed to insert the record:', response.statusText);
            toast.error('Error in uploading questions');
            success = false;
            break;
          }
        }
      } else {
        console.error('Failed to insert the record:', response.statusText);
        toast.error('Error in uploading questions');
      }
      if(!success){
        break
      }
      success &&= response.ok;
    }
    setIsLoading(false);
    setLid(-1);
    // console.log(lid)
    if (success) {
      toast.success('Questions uploaded successfully');
    } else {
      toast('Check Strapi server logs for more info');
    }
  };

  const handleCourse = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    if (id === -1) return;
    setSelectedUnits(units.filter((unit) => unit.courseId === courses[id].id));
  };

  const handleUnit = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    if (id === -1) return;
    setSelectedLesson(lessons.filter((lesson) => lesson.unitId === units[id].id));
  };

  const handleLesson = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    if (id === -1) return;
    setLid(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h1 className="text-3xl font-bold mb-4 text-center">MCQs</h1>
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <input
          type="file"
          accept=".txt,.csv"
          onChange={handleFileUpload}
          className="w-full p-2 border rounded mb-4"
        />
          {isLoading ? (
              <p>Uploading...</p>
            ):(
              mcqs.length > 0 && (
                <>
                  <div className="mb-4">
                    <select onChange={handleCourse} className="w-full p-2 border rounded mb-4">
                      <option value={-1}>Select Course</option>
                      {courses.map((course, i) => (
                        <option key={i} value={i}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    <select onChange={handleUnit} className="w-full p-2 border rounded mb-4">
                      <option value={-1}>Select Unit</option>
                      {selectedUnits.map((unit, i) => (
                        <option key={i} value={i}>
                          {unit.title}
                        </option>
                      ))}
                    </select>
                    <select onChange={handleLesson} className="w-full p-2 border rounded mb-4">
                      <option value={-1}>Select Lesson</option>
                      {selectedLesson.map((lesson) => (
                        <option key={lesson.id} value={lesson.id}>
                          {lesson.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </>
              )
            )
          }
          

        {mcqs.map((mcq, index) => (
          <div key={index} className="mt-6">
            <h3 className="font-semibold">{mcq.question}</h3>
            <ol type="A" className="list-decimal pl-4">
              <li>{options[index * 4]?.text}</li>
              <li>{options[index * 4 + 1]?.text}</li>
              <li>{options[index * 4 + 2]?.text}</li>
              <li>{options[index * 4 + 3]?.text}</li>
            </ol>
            <p className="text-green-600">
              Answer: {options.find((opt, i) => i >= index * 4 && opt.correct)?.text}
            </p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImportQues;
