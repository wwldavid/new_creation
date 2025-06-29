"use client";
import React, { useState } from "react";
import {
  Play,
  Calendar,
  User,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const VideoPlayer = () => {
  const sermons = [
    {
      id: 1,
      title: "需要的满足",
      speaker: "Jeremy",
      date: "2025-05-11",
      scripture: "约翰福音 6:30-40",
      youtubeId: "wgncT6tXlV8",
      description:
        "透过主耶稣关于“天上粮”的教导，提醒我们神供应的不只是日常所需，更是带来永生的灵粮。深入探讨信靠耶稣是唯一能够真正满足我们内心深处渴望的方法。",
    },
    {
      id: 2,
      title: "你要痊愈吗？",
      speaker: "Jeremy",
      date: "2025-04-13",
      scripture: "约翰福音 5:1-15",
      youtubeId: "z0L4lvSPhYc",
      description:
        "从耶稣在毕士大池边医治瘫痪者的故事出发，挑战我们面对属灵和身体的束缚时，是否愿意听从并回应主的呼召，体验神迹带来的医治与翻转生命的能力。",
    },
    {
      id: 3,
      title: "顺控圣灵",
      speaker: "Jeremy",
      date: "2025-03-23",
      scripture: "约翰福音 3:1-15",
      youtubeId: "jbHSS7pJpXw",
      description:
        "藉着尼哥底母夜来与耶稣对话，讲道强调“重生”的奥秘与圣灵在信徒生命中的引导与掌管，鼓励我们活出被圣灵更新、控制和引领的生命样式。",
    },
    {
      id: 4,
      title: "基督的接纳",
      speaker: "Jeremy",
      date: "2025-01-12",
      scripture: "约翰福音 1:14-18",
      youtubeId: "Lxw1MKrxA1A",
      description:
        "聚焦“道成肉身”的真理，强调耶稣基督以满有恩典与真理来到世界，完全理解并接纳我们。提醒我们在他里面我们不仅被看见，更被深深爱与接受。",
    },
  ];

  const [selectedSermon, setSelectedSermon] = useState(sermons[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      timeZone: "America/Edmonton",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const playSermon = (sermon) => {
    setSelectedSermon(sermon);
  };

  return (
    <div className=" p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mt-5 mb-5">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">主日讲道</h2>
        <p className="text-gray-600">聆听神的话语，领受属灵的喂养</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 视频播放区域 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {selectedSermon ? (
              <div>
                <div className="aspect-video bg-gray-900">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedSermon.youtubeId}`}
                    title={selectedSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-none"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {selectedSermon.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{formatDate(selectedSermon.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-2 text-green-600" />
                      <span>{selectedSermon.speaker}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2 text-purple-600" />
                      <span>{selectedSermon.scripture}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedSermon.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    请选择一个讲道开始播放
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 讲道列表 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-800">
                  讲道列表
                </h4>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className={`${isExpanded ? "block" : "hidden"} lg:block`}>
              <div className="max-h-96 overflow-y-auto">
                {sermons.map((sermon) => (
                  <div
                    key={sermon.id}
                    onClick={() => playSermon(sermon)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                      selectedSermon?.id === sermon.id
                        ? "bg-blue-100 border-l-4 border-l-blue-600"
                        : "hover:border-l-4 hover:border-l-blue-300"
                    }`}
                  >
                    <h5 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {sermon.title}
                    </h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1 text-green-600" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-blue-600" />
                        <span>{formatDate(sermon.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1 text-purple-600" />
                        <span className="truncate">{sermon.scripture}</span>
                      </div>
                    </div>
                    {selectedSermon?.id === sermon.id && (
                      <div className="mt-2 flex items-center text-blue-600 text-sm">
                        <Play className="w-3 h-3 mr-1" />
                        <span>正在播放</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
