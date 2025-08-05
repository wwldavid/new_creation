import React from "react";
import Image from "next/image";

const HEADER = {
  en: {
    title: "Discipleship Training Camps",
    desc: "Through systematic discipleship training, we help believers experience life transformation and renewal in Christ, living out the true life of Christ.",
  },
  zh: {
    title: "门徒训练营会",
    desc: "通过系统性的门徒训练，帮助信徒在基督里得到生命的转化和更新，活出真正的基督生命",
  },
};
const CAMPS = {
  en: [
    {
      id: 1,
      title: `Camp 1: Discipleship “Life in Christ”`,
      image: "/camps/event1.jpg",
      content: `Many Christians have believed for a long time and know the truth clearly, yet cannot truly live it out.

Although they know John 8:32 says “you will know the truth, and the truth will set you free,” they don’t feel that freedom in practice. In other words, though we have new life by faith in Christ, we still act according to our old values.

This session “Life in Christ” focuses on John 8:31–32: 
“Jesus said to the Jews who had believed him, ‘If you abide in my word, you are truly my disciples; and you will know the truth, and the truth will set you free.’”

It’s a transformation from worldly values to eternal values, so believers experience renewal and transformation in Christ.`,
    },
    {
      id: 2,
      title: `Camp 2: Discipleship “The New Creation”`,
      image: "/camps/event2.jpg",
      content: `2 Corinthians 5:17 says, “Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.”

This training builds on “Life in Christ” to show that we are new creations—our old selves are gone.

Romans 6:4: “We were buried therefore with him by baptism into death, so that as Christ was raised from the dead…we too might walk in newness of life.”

And Romans 6:14: “For sin will have no dominion over you, since you are not under law but under grace.”
`,
    },
    {
      id: 3,
      title: `Camp 3: Discipleship “Church and Me”`,
      image: "/camps/event3.jpg",
      content: `This third camp is for believers already active in church life, exploring “Church and Me.”

In the body of Christ we should live in joy, glory, and unity. Yet conflicts, misunderstandings, and divisions can hurt the body.

We will rediscover the church’s earthly mission, learn to live as new creations in community, and experience the meaning of loving one another.`,
    },
    {
      id: 4,
      title: `Camp 4: Discipleship “Receiving God’s Word”`,
      image: "/camps/event4.jpg",
      content: `The fourth camp trains us to read Scripture with a resurrected life, using context-driven methods so that God’s Word transforms us.

Key questions we’ll discuss:
- Which Bible translation should I choose?
- How much background study is necessary?
- Do I need to read entire books or scholarly works first?
- How do I discern proper interpretation when opinions differ?
- How do I apply Scripture when it challenges my thinking?

Only a resurrected life can truly receive God’s Word so that “the unfolding of your words gives light; it imparts understanding to the simple.” (Psalm 119:130)`,
    },
  ],
  zh: [
    {
      id: 1,
      title: "营会第一期 门徒训练《基督里的人生》",
      image: "/camps/event1.jpg",
      content: `很多的基督徒信主很久了，虽然对真理有很清楚的认识，但不能真实的活出来。

虽然知道圣经说"真理必叫你们得以自由"，但活出来却感受不到这样的自由。也就是说，虽然我们知道自己重生得救之后有了新生命，但还是活在旧有的价值观里。

本期基督里的人生，主要让我们学习到一个核心的内容：
约翰福音8章31-32节:"耶稣对信他的犹太人说，你们若常常遵守我的道，就真是我的门徒。你们必晓得真理，真理必叫你们得以自由"。

这是从世界的价值观到永恒价值观的改变。藉此，信徒在基督里的生命得到转化和更新。`,
    },
    {
      id: 2,
      title: "营会第二期 门徒训练《新造的人》",
      image: "/camps/event2.jpg",
      content: `哥林多后书5章17节说"若有人在基督裡,他就是新造的人,旧事已过,都变成新的了".

这期的门徒训练是接续上期的基督里的人生,
告诉我们：我们是一群新造的人。旧事都已经过去，在基督里我们都是新人。

罗马书6章4节:"所以我们藉着洗礼归入死,和他一同埋葬,原是叫我们一举一动有新生的样式,像基督藉着父的荣耀从死里复活一样"。

罗马书6章14节又说 "罪必不能作你们的主,因你们不在律法之下,乃在恩典之下."`,
    },
    {
      id: 3,
      title: "营会第三期 门徒训练《我与教会》",
      image: "/camps/event3.jpg",
      content: `这是基督新人事工"门训"信息里的第三个营会，是特别与已经信主并且有教会生活的弟兄姐妹们一起来探讨"我与教会"的主题。

在教会里我们应该是一个喜乐、荣耀和合一的生活，却常会因遇到这样或那样的一些问题，导致不能合一甚至离开教会，又或因服侍受伤、因爱心被误会、因意见不同而行同陌路，本是同工却变成彼此攻击的对象。

面对这些现象，我们将在营会里重新认识教会在地上的荣耀使命，并一同以新人的生命学习如何活在教会里，也一同感受肢体生活的意义，并且活出爱人更爱神的教会生活。`,
    },
    {
      id: 4,
      title: "营会第四期 门徒训练《领受神的话》",
      image: "/camps/event4.jpg",
      content: `是基督新人事工门徒培训的第四个营会，操练以重生的生命来研读神的话语，以语文（上下文）的方式读经，让神的话改变我们，好活出基督的生命。

营会坚持的读经原则：先有字意，才有经意，有了经意，才有意义。

我们经常会问：

我要读哪个圣经的译本？
要查考多少原文、了解多少背景资料？
还是应读解经书，上网找资料，或听有名的牧师解经？
是不是需要看过整卷甚至整本圣经才能够了解经文的意思？
是不是需要读懂神学，才能正确理解圣经？

我们也经常听到不同的人对同一段经文有不同的解释。一段经文真的是有多种解释，还是只有一种解释正确？

为什么牧师可以看懂经文的意思，从经文得到亮光，我却想不懂这段的意思？

我自己读到的亮光是这段经文的意思吗？

当圣经的逻辑和我的想法产生冲突的时候，我该如何抉择？

我该如何应用经文？

营会将探讨上述问题。

只有以一个重生的生命，才能领受神的话，让神的话在自己身上有作用。
"你的言语一解开，就发出亮光，使愚人通达"。（诗篇119:130）`,
    },
  ],
};

const FOOTER = {
  en: "Discipleship Training Camps • New-Creation’s Life Ministries",
  zh: "基督新人事工 门徒训练营会",
};

const CampComponent = ({ lang }) => {
  const header = HEADER[lang] || HEADER.en;
  const camps = CAMPS[lang] || CAMPS.en;
  const footer = FOOTER[lang] || FOOTER.en;

  return (
    <div>
      {/* 标题部分 */}
      <div className="text-center py-12 px-4">
        <h1
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{ color: "#495859" }}
        >
          {header.title}
        </h1>
        <p
          className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium"
          style={{ color: "#647a5c" }}
        >
          {header.desc}
        </p>
      </div>

      {/* 营会内容 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {camps.map((camp, index) => (
          <div
            key={camp.id}
            className={`mb-12 lg:mb-16 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl flex flex-col gap-6 ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } flex flex-col lg:flex`}
            style={{
              backgroundColor: index % 2 === 0 ? "#c4d3d5" : "#647a5c",
              minHeight: "500px",
            }}
          >
            {/* 图片部分 */}
            <div className="w-full lg:w-2/5">
              <div className="relative h-[480px] sm:h-full  overflow-hidden">
                <Image
                  src={camp.image}
                  alt={camp.title}
                  fill
                  className="object-contain sm:object-cover transition-transform duration-700 hover:scale-110"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                  sizes="100vw"
                />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#495859" : "#b59959",
                  }}
                ></div>
              </div>
            </div>

            {/* 内容部分 */}
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              <h2
                className="text-2xl lg:text-3xl font-bold mb-6 leading-tight"
                style={{
                  color: index % 2 === 0 ? "#495859" : "#ece1d1",
                  textShadow:
                    index % 2 === 0 ? "none" : "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                {camp.title}
              </h2>

              <div
                className="text-base lg:text-lg leading-relaxed space-y-4"
                style={{
                  color: index % 2 === 0 ? "#495859" : "#ece1d1",
                  textShadow:
                    index % 2 === 0 ? "none" : "1px 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                {camp.content.split("\n\n").map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 底部装饰 */}
      <div className="text-center py-12">
        <div
          className="w-24 h-1 mx-auto rounded-full mb-4"
          style={{ backgroundColor: "#b59959" }}
        ></div>
        <p className="text-sm font-medium" style={{ color: "#647a5c" }}>
          {footer}
        </p>
      </div>
    </div>
  );
};

export default CampComponent;
