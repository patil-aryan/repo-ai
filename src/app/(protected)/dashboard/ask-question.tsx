"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import { set } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
// import { askQuestion } from "./actions";
import { generate } from "./actions";
import { readStreamableValue } from "ai/rsc";
import MDEditor from "@uiw/react-md-editor";
import { Loader } from "lucide-react";
import CodeReferences from "./code-references";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [filesReferences, setFilesReferences] =
    useState<{ fileName: string; sourceCode: string; summary: string }[]>();
  const [answer, setAnswer] = useState("");
  const saveAnswer = api.project.saveAnswer.useMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFilesReferences([]);
    e.preventDefault();
    if (!project?.id) return;
    setLoading(true);

    // const {output, filesReference} = await askQuestion(question, project.id);
    const { output, filesReference } = await generate(question, project.id);
    setOpen(true);
    setFilesReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="bg-white sm:max-w-[60vw]">
          <DialogHeader>
            {/* <div className="flex items-center gap-2"> */}
              <DialogTitle>
                <div className="flex items-center gap-2">
                  {" "}
                  {/* Flex container to align image and text */}
                  <Image
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvbWJpbmUiPjxwYXRoIGQ9Ik0xMCAxOEg1YTMgMyAwIDAgMS0zLTN2LTEiLz48cGF0aCBkPSJNMTQgMmEyIDIgMCAwIDEgMiAydjRhMiAyIDAgMCAxLTIgMiIvPjxwYXRoIGQ9Ik0yMCAyYTIgMiAwIDAgMSAyIDJ2NGEyIDIgMCAwIDEtMiAyIi8+PHBhdGggZD0ibTcgMjEgMy0zLTMtMyIvPjxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgcng9IjIiLz48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiByeD0iMiIvPjwvc3ZnPg=="
                    alt="logo"
                    width={40}
                    height={40}
                  />
                  <span className="text-xl font-semibold">RepoAI</span>{" "}
                  {/* Text next to the image */}
                </div>
              </DialogTitle>
              
            {/* </div> */}
          </DialogHeader>

          {/* <MDEditor.Markdown source={answer} className="max-w-[70vw] !h-full max-h-[40vh] overflow-scroll"/> */}
          {/* <MDEditor.Markdown
            source={answer}
            className="p-5 bg-white prose !h-full max-h-[40vh] max-w-[80vw] overflow-auto" // Added `prose` for better Markdown styling
          /> */}
          {/* <MDEditor.Markdown
            source={answer}
            className="prose prose-sm sm:prose-base max-h-[50vh] w-full max-w-[80vw] overflow-auto rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          />
          <Button
            type="button"
            onClick={() => setOpen(false)}
            disabled={loading}
            className=""
          >
            Close
          </Button> */}
          <div className="flex flex-col gap-4">
            {" "}
            {/* Container for Markdown and Button */}
            <MDEditor.Markdown
              source={answer}
              className="prose prose-sm sm:prose-base max-h-[50vh] w-full max-w-[80vw] overflow-auto rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            />
            <CodeReferences fileReferences={filesReferences} />
            <div className="flex justify-end">
              {" "}
              {/* Flex container to align button to the right */}
              <Button className="mr-2 bg-black rounded-md text-white hover:bg-gray-900 hover:text-white"  disabled={saveAnswer.isPending} variant={'outline'} onClick={() => {
                saveAnswer.mutate({
                  answer,
                  question,
                  projectId: project!.id,
                  filesReferences
                },{
                    onSuccess: () => {
                        toast.success('Query saved successfully')
                    },
                    onError: () => {
                        toast.error('Failed to save query')
                    }

                })
              }}> Save query
              </Button>

              <Button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4" />{" "}
                    {/* Add a spinner for loading state */}
                    Loading...
                  </div>
                ) : (
                  "Close"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="col-span-3">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Talk to your Github Repo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <Textarea
                placeholder="In which file is the function 'getAllEmbeddings()' defined?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <div className="h-4"></div>
              <div className="flex justify-end">
                <Button type="submit">Ask RepoAI</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AskQuestionCard;
