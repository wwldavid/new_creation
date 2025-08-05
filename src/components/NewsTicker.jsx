"use client";
import React, { useState, useEffect } from "react";

export default function NewsTicker({ lang = "en" }) {
  const [current, setCurrent] = useState(0);
  const [bibleIndex, setBibleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const BIBLE = {
    en: [
      "“Jesus answered, 'Man shall not live by bread alone, but by every word that comes from the mouth of God.'” — Matthew 4:4",
      "“The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. …” — Psalm 23:1-4",
      "“Jesus answered, 'Man shall not live by bread alone, but by every word that comes from the mouth of God.'” — Matthew 4:4",
      "“The Lord is my shepherd, I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul. He leads me in paths of righteousness for his name's sake.” — Psalm 23:1-4",
      "“For the Lord is good and his love endures forever; his faithfulness continues through all generations.” — Psalm 100:5",
      "“God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea… The nations rage, the kingdoms totter; he utters his voice, the earth melts.” — Psalm 46:1-6",
      "“My son, do not despise the Lord's discipline or be weary of his reproof, for the Lord reproves him whom he loves, as a father the son in whom he delights. Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.” — Proverbs 3:5-6,11-12",
      "“His understanding is unsearchable. He gives power to the faint, and to him who has no might he increases strength. Even youths shall faint and be weary, and young men shall fall exhausted; but they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.” — Isaiah 40:28-31",
      "“Delight yourself in the Lord, and he will give you the desires of your heart.” — Psalm 37:4",
      "“'For I know the plans I have for you,' declares the Lord, 'plans for peace and not for evil, to give you a future and a hope. Then you will call upon me and come and pray to me, and I will hear you. You will seek me and find me, when you seek me with all your heart.'” — Jeremiah 29:11-13",
      "“Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.” — Philippians 4:6-7",
      "“'All things are lawful,' but not all things are helpful. 'All things are lawful,' but not all things build up.” — 1 Corinthians 10:23",
      "“I appeal to you therefore, brothers, by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship. Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.” — Romans 12:1-2",
      "“Let not your hearts be troubled. Believe in God; believe also in me. In my Father's house are many rooms… I go to prepare a place for you, I will come again and will take you to myself, that where I am you may be also.” — John 14:1-3",
      "“No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it.” — 1 Corinthians 10:13",
      "“Whoever wants to become great among you must be your servant, and whoever wants to be first must be your slave.” — Matthew 20:26-27",
      "“I appeal to you therefore, brothers, by the mercies of God, to present your bodies as a living sacrifice… Do not be conformed to this world, but be transformed by the renewal of your mind…” — Luke 6:27-28 (Note: mismatch in reference; content may vary)",
      "“My command is this: Love each other as I have loved you.” — John 15:12",
      "“For God alone, O my soul, wait in silence, for my hope is from him.” — Psalm 62:5",
      "“Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.” — Ephesians 4:32",
      "“I have stored up your word in my heart, that I might not sin against you.” — Psalm 119:11",
    ],
    zh: [
      "“耶稣说：人活着，不是单靠食物，而是靠神口里所出的一切话。” —— 马太福音 4:4",
      "“耶和华是我的牧者，我必不至缺乏。他使我躺卧在青草地上，领我在可安歇的水边。…” —— 诗篇 23:1-4",
      "“耶稣说：人活着，不是单靠食物，而是靠神口里所出的一切话。” —— 马太福音 4:4",
      "“耶和华是我的牧者，我必不至缺乏。他使我躺卧在青草地上，领我在可安歇的水边。他使我的灵魂苏醒，为自己的名引导我走义路。我虽然行过死荫的幽谷，也不怕遭害，因为你与我同在；你的杖、你的竿都安慰我。” —— 诗篇 23:1-4",
      "“惟有耶和华是可靠的。他的慈爱永远长存，他的信实直到万代。” —— 诗篇 100:5",
      "“神是我们的避难所和力量，是我们随时的帮助。所以地虽改变，山虽摇动到海心，也不害怕。大河的蒲草在其中欢呼，黎巴嫩的山过去，锡安的山却坚立，因为耶和华在其中，这城必不动摇。” —— 诗篇 46:1-6",
      "“我儿，不可轻看耶和华的管教；受他的责备，也不可厌烦。因为耶和华所爱的，他必责备；正如父亲责备所爱的儿子。你要专心仰赖耶和华，不可倚靠自己的聪明；在你一切所行的事上都要认定他，他必指引你的路。” —— 箴言 3:5-6,11-12",
      "“他的智慧无法测度。他赐能力给疲乏的人，赐力量给软弱的人。少年人也要疲乏困倦，强壮的也必全然跌倒；但那等候耶和华的，必重新得力；他们必如鹰展翅上腾，奔跑却不困倦，行走却不疲乏。” —— 以赛亚书 40:28-31",
      "“你要以耶和华为乐。他就将你心里所求的赐给你。” —— 诗篇 37:4",
      "“耶和华说：我知道我向你们所怀的意念，是赐平安的意念，不是降灾祸的意念，要给你们一个将来和盼望。你们呼求我，祷告我，我就应允你们；你们寻求我，若专心寻求我，就必寻见。” —— 耶利米书 29:11-13",
      "“应当一无挂虑，只要凡事借着祷告、祈求和感谢，将你们所要的告诉神。神所赐出人意外的平安，必在基督耶稣里保守你们的心怀意念。” —— 腓立比书 4:6-7",
      "“凡事都可行，但不都有益处；凡事都可行，但不都造就人。” —— 哥林多前书 10:23",
      "“所以弟兄们，我以神的慈悲劝你们，将身体献上，当作活祭，是圣洁、是神所喜悦的；你们如此事奉，乃是理所当然的。不要效法这个世界，只要心意更新而变化，叫你们察验何为神的善良、纯全、可喜悦的旨意。” —— 罗马书 12:1-2",
      "“你们心里不要忧愁，你们信神，也当信我。在我父的家里有许多住处；我若去为你们预备了地方，就必再来接你们到我那里去，我在那里，叫你们也在那里。” —— 约翰福音 14:1-3",
      "“你们所遇见的试探，无非是人所能受的。神是信实的，必不容你们受试探过于所能受的；在受试探的时候，总要给你们开一条出路，叫你们能忍受得住。” —— 哥林多前书 10:13",
      "“你们中间谁愿为大，就必作你们的用人；谁愿为首，就必作你们的仆人。” —— 马太福音 20:26-27",
      "“所以弟兄们，我以神的慈悲劝你们，将身体献上，当作活祭，是圣洁、是神所喜悦的；你们如此事奉，乃是理所当然的。不要效法这个世界，只要心意更新而变化，叫你们察验何为神的善良、纯全、可喜悦的旨意。” —— 路加福音 6:27-28",
      "“你们要彼此相爱，像我爱你们一样，这就是我的命令。” —— 约翰福音 15:12",
      "“心里安静依靠神，才得帮助。我的心哪，你当默默无声，专等候神，因为我的盼望是从他而来。” —— 诗篇 62:5",
      "“当以恩慈相待，存怜悯的心，彼此饶恕，正如神在基督里饶恕了你们一样。” —— 以弗所书 4:32",
      "“我将你的话藏在心里，免得我得罪你。” —— 诗篇 119:11",
    ],
  };

  const CONTENT = {
    en: [
      {
        title: "Weekly Bible Study",
        details: [
          "Every Tuesday at 7:00 PM via Zoom",
          "Zoom ID: 752 175 4998",
          "Passcode: 123456",
        ],
      },
      {
        title: "Sunday Worship",
        details: [
          "3:00 PM",
          "Queensway Baptist Church",
          "950 Islington Avenue, Etobicoke, ON M8Z 4P6",
        ],
      },
    ],
    zh: [
      {
        title: "每周查经",
        details: [
          "每周二晚上 7:00 通过 Zoom",
          "会议 ID: 752 175 4998",
          "密码: 123456",
        ],
      },
      {
        title: "主日崇拜",
        details: [
          "下午 3:00",
          "皇后湾浸信会",
          "加拿大安大略省多伦多市伊斯灵顿大道 950 号",
        ],
      },
    ],
  };

  const TITLES = {
    en: {
      events: "Upcoming Events",
      bible: "Bible Verses",
      support: "Support Us",
    },
    zh: {
      events: "近期活动",
      bible: "圣经箴言",
      support: "支持我们",
    },
  };

  const SUPPORT = {
    en: {
      title:
        "Check donations: Please make payable to New-Creation's Life Ministries, NCLM",
      desc: "E-transfers and stock donations: finance.nclm@gmail.com. For more information, contact finance.nclm@gmail.com",
    },
    zh: {
      title: "支票奉献：请开给 New-Creation's Life Ministries, NCLM",
      desc: "电子转账与股票奉献: finance.nclm@gmail.com。如未收到奉献收据, 请联系 finance.nclm@gmail.com",
    },
  };

  const t = TITLES[lang] || TITLES.en;
  const content = CONTENT[lang] || CONTENT.en;
  const bible = BIBLE[lang] || BIBLE.en;
  const support = SUPPORT[lang] || SUPPORT.en;

  // 轮询 bibleIndex
  useEffect(() => {
    const bibleTimer = setInterval(() => {
      setBibleIndex((prev) => (prev + 1) % bible.length);
    }, 5000);
    return () => clearInterval(bibleTimer);
  }, [bible.length]);

  return (
    <div>
      <div
        className="w-60 h-60  shadow-md overflow-hidden relative mx-auto bg-cover bg-center bg-no-repeat bg-[#e0ebaf]/50"
        style={{ backgroundImage: "url('/frame.png')" }}
      >
        <div className=" text-center py-5">
          <h2 className="text-md font-bold tracking-wide">{t.events}</h2>
        </div>
        {content.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 p-4 mt-10 transition-opacity duration-1000 ease-in-out
            ${current === index ? "opacity-100" : "opacity-0"}`}
          >
            <h2 className="text-lg font-semibold text-[#495859] mb-2 text-center">
              {item.title}
            </h2>
            {item.details.map((line, i) => (
              <p key={i} className="text-sm text-[#495859] leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div
        className="w-60 h-60  shadow-md overflow-hidden relative mx-auto mt-4 bg-cover bg-center bg-no-repeat bg-[#e6b422]/30"
        style={{ backgroundImage: "url('/frame.png')" }}
      >
        <div className=" text-center py-5">
          <h2 className="text-md font-bold tracking-wide text-[#495859]">
            {t.bible}
          </h2>
        </div>
        {bible.map((verse, idx) => (
          <div
            key={idx}
            className={`
              absolute inset-0 p-4 mt-10
              transition-opacity duration-1000 ease-in-out
              ${bibleIndex === idx ? "opacity-100" : "opacity-0"}
            `}
          >
            <p className="text-sm text-gray-800 leading-relaxed text-center">
              {verse}
            </p>
          </div>
        ))}
      </div>
      <div
        className="w-60 h-60  shadow-md overflow-hidden relative mx-auto mt-4 bg-cover bg-center bg-no-repeat bg-[#bce2e8]/30"
        style={{ backgroundImage: "url('/frame.png')" }}
      >
        <div className=" text-center ">
          <h2 className="text-md font-semibold text-[#1e3a5f] mt-4">
            {t.support}
          </h2>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold text-[#1e3a5f] mb-2 ">
            {support.title}
          </h3>

          <p className="text-sm text-gray-700">{support.desc}</p>
        </div>
      </div>
    </div>
  );
}
