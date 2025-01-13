"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import React from "react";
import AskQuestionCard from "../dashboard/ask-question";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const Query = () => {
  const { project, projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({ projectId });
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const question = questions?.[questionIndex];

  return (
    <div>
      <Sheet>
        <AskQuestionCard />
        <div className="h-4"></div>
        <h1 className="text-xl font-semibold">Saved Queries</h1>
        <div className="h-2"></div>
        <div className="flex flex-col gap-2">
          {questions?.map((question: any, index: number) => (
            <div key={index}>
              <SheetTrigger onClick={() => setQuestionIndex(index)}>
                <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow mb-2">
                  <img
                    className="rounded-full"
                    height={30}
                    width={30}
                    src={
                      question.user?.imageUrl ||
                      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWdpdGh1YiI+PHBhdGggZD0iTTE1IDIydi00YTQuOCA0LjggMCAwIDAtMS0zLjVjMyAwIDYtMiA2LTUuNS4wOC0xLjI1LS4yNy0yLjQ4LTEtMy41LjI4LTEuMTUuMjgtMi4zNSAwLTMuNSAwIDAtMSAwLTMgMS41LTIuNjQtLjUtNS4zNi0uNS04IDBDNiAyIDUgMiA1IDJjLS4zIDEuMTUtLjMgMi4zNSAwIDMuNUE1LjQwMyA1LjQwMyAwIDAgMCA0IDljMCAzLjUgMyA1LjUgNiA1LjUtLjM5LjQ5LS42OCAxLjA1LS44NSAxLjY1LS4xNy42LS4yMiAxLjIzLS4xNSAxLjg1djQiLz48cGF0aCBkPSJNOSAxOGMtNC41MSAyLTUtMi03LTIiLz48L3N2Zz4="
                    }
                    alt="Avatar"
                  />

                
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <p className="line-clamp-1 text-lg font-medium text-gray-700">
                        {question.question}
                      </p>
                      <span className="whitespace-nowrap text-xs text-gray-400">
                        {question.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-sm text-gray-500">
                      {question.answer}
                    </p>
                  </div>
                  </div>

                
              </SheetTrigger>
            </div>
          ))}
        </div>

        {question && (
          <SheetContent className="overflow-scroll sm:max-w-[80vw]">
            <SheetHeader>
              <SheetTitle>
                <div className="py-4">Query</div>
                <div className="rounded-lg border bg-white p-4 shadow">
                  <span className="text-md leading-tight text-gray-700">
                    {question.question}
                  </span>
                </div>
              </SheetTitle>
              <div>
                <SheetTitle className="py-4">RepoAI</SheetTitle>
                <MDEditor.Markdown className="p-4 rounded-md" source={question.answer} />
              </div>
              <CodeReferences
                fileReferences={question.fileReferences ?? ([] as any)}
              />
            </SheetHeader>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};

export default Query;
