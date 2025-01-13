<>
    //   <Dialog open={open} onOpenChange={() => setOpen(false)}>
    //     <DialogOverlay className="fixed inset-0 bg-white/50 backdrop-blur-md transition-opacity duration-300" />
    //     {/* Improved frosted glass effect with smoother transitions */}
    //     {/* <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-2xl ring-1 ring-gray-300 transition-transform duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-left-full data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-full data-[state=open]:slide-in-from-top-1/2"> */}
    //     <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full sm:max-w-[80vw]: max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-2xl ring-1 ring-gray-300 transition-transform duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-left-full data-[state=closed]:slide-out-to-top-1/2 data-[state=open]:slide-in-from-left-full data-[state=open]:slide-in-from-top-1/2">
    //       <DialogHeader>
    //         <DialogTitle className="flex items-center gap-4 text-2xl font-bold text-gray-800">
    //           <Image
    //             src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvbWJpbmUiPjxwYXRoIGQ9Ik0xMCAxOEg1YTMgMyAwIDAgMS0zLTN2LTEiLz48cGF0aCBkPSJNMTQgMmEyIDIgMCAwIDEgMiAydjRhMiAyIDAgMCAxLTIgMiIvPjxwYXRoIGQ9Ik0yMCAyYTIgMiAwIDAgMSAyIDJ2NGEyIDIgMCAwIDEtMiAyIi8+PHBhdGggZD0ibTcgMjEgMy0zLTMtMyIvPjxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgcng9IjIiLz48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiByeD0iMiIvPjwvc3ZnPg=="
    //             alt="logo"
    //             width={40}
    //             height={40}
    //           />
    //           Ask RepoAI
    //         </DialogTitle>
    //       </DialogHeader>

    //       <MDEditor.Markdown
    //         source={answer}
    //         className="prose max-h-[60vh] w-full overflow-y-auto rounded-md border-t border-gray-300 bg-gray-50 pt-6 text-[1rem] leading-relaxed tracking-wide text-gray-800 shadow-inner lg:text-[1.125rem]"
    //         // Improved readability, spacing, and visual aesthetics
    //       />

    //       <div className="mt-6 flex justify-end">
    //         <Button
    //           type="button"
    //           onClick={() => setOpen(false)}
    //           disabled={loading}
    //           className={`flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400`}
    //         >
    //           {loading ? (
    //             <>
    //               <Loader className="h-5 w-5 animate-spin" />
    //               Loading...
    //             </>
    //           ) : (
    //             "Close"
    //           )}
    //         </Button>
    //       </div>
    //     </DialogContent>
    //   </Dialog>