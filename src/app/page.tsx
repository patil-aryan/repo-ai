"use client";

import { Bot, Code, Search, MessageCircle, Users, Clock, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvbWJpbmUiPjxwYXRoIGQ9Ik0xMCAxOEg1YTMgMyAwIDAgMS0zLTN2LTEiLz48cGF0aCBkPSJNMTQgMmEyIDIgMCAwIDEgMiAydjRhMiAyIDAgMCAxLTIgMiIvPjxwYXRoIGQ9Ik0yMCAyYTIgMiAwIDAgMSAyIDJ2NGEyIDIgMCAwIDEtMiAyIi8+PHBhdGggZD0ibTcgMjEgMy0zLTMtMyIvPjxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgcng9IjIiLz48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiByeD0iMiIvPjwvc3ZnPg=="
            alt="RepoAI Logo"
            width={40}
            height={40}
          />
          <h1 className="text-2xl font-bold text-primary">RepoAI</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/create">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simplify Developer Collaboration with <span className="text-primary">RepoAI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A powerful platform designed to make code projects more efficient, transparent, and collaborative.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/create">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Automatic Code Documentation */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                <Code className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Automatic Code Documentation
              </h3>
              <p className="text-gray-600">
                Generate detailed code documentation to help developers understand your project quickly.
              </p>
            </div>

            {/* Feature 2: Codebase Search */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                <Search className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Codebase Search
              </h3>
              <p className="text-gray-600">
                Find specific code components with context-aware search capabilities.
              </p>
            </div>

            {/* Feature 3: Commit Message Summaries */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                <MessageCircle className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Commit Message Summaries
              </h3>
              <p className="text-gray-600">
                Stay updated with AI-generated summaries of commit messages.
              </p>
            </div>

            {/* Feature 4: Meeting Transcription */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                <Clock className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Meeting Transcription
              </h3>
              <p className="text-gray-600">
                Transcribe meetings and extract key topics for easy reference.
              </p>
            </div>

            {/* Feature 5: Real-Time Contextual Meeting Search */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                <Search className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Meeting Search
              </h3>
              <p className="text-gray-600">
                Quickly find answers to questions about past meetings.
              </p>
            </div>

            {/* Feature 6: Collaborative Platform */}
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                <Users className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Collaborative Platform
              </h3>
              <p className="text-gray-600">
                Work together seamlessly with access to documentation, meeting summaries, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} RepoAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;