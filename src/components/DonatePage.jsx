"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const SCRIPTURES = {
  en: [
    {
      text: "Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.",
      reference: "2 Corinthians 9:7",
    },
    {
      text: "Giving is not a transaction but an extension of worship—a heart released in Christ to participate in His Kingdom on earth. “For from him and through him and to him are all things. To him be glory forever. Amen!”",
      reference: "Romans 11:36",
    },
    {
      text: "May our offerings and our hearts become “a fragrant offering, an acceptable sacrifice, pleasing to God” (Philippians 4:18), partnering in the work of glorifying God and expanding His Kingdom.",
      reference: "Philippians 4:18",
    },
    {
      text: "We believe that every spiritual and material gift comes from God's sovereignty and love. Each gift is the fruit of the Spirit's work in the believer's heart—a response of thanksgiving to free grace. “We love because he first loved us.”",
      reference: "1 John 4:19",
    },
    {
      text: "Every financial gift received by New Creation Life Ministries, large or small, is given willingly by God's people to advance the gospel, edify the saints, and build the church. “Bring the full tithe into the storehouse…'Test me in this,' says the Lord of hosts, 'and see if I will not open the windows of heaven…'”",
      reference: "Malachi 3:10",
    },
  ],
  zh: [
    {
      text: "各人要随本心所酌定的，不要作难，不要勉强，因为捐得乐意的人是神所喜爱的。",
      reference: "哥林多后书 9:7",
    },
    {
      text: "奉献并非一种买卖或交换，乃是敬拜的延伸，是在基督里得释放的心，甘愿参与祂在地上的国度作为。“因为万有都是本于他，倚靠他，归于他。愿荣耀归给他，直到永远。阿们！”",
      reference: "罗马书 11:36",
    },
    {
      text: "愿我们所献的金钱与心志，成为那“馨香之气，是神所收纳所喜悦的祭”（腓立比书 4:18),一同参与荣耀神、扩展祂国度的圣工。",
      reference: "腓立比书 4:18",
    },
    {
      text: "我们深信，一切属灵与物质的恩赐都出于神的主权与慈爱。每一份奉献，都是圣灵在信徒心中所动工的果效，是回应那白白恩典的感恩之举。“我们爱，因为神先爱我们。”",
      reference: "约翰一书 4:19",
    },
    {
      text: "New Creation Life Ministries 所领受的每一笔金钱支持，无论数额大小，都是神百姓甘心乐意的献上，用以推动福音的广传、圣徒的造就与教会的建造，正如经上所记：“你们要将当纳的十分之一全然送入仓库，使我家有粮；以此试试我，是否为你们敞开天上的窗户，倾福与你们，甚至无处可容。”",
      reference: "玛拉基书 3:10",
    },
  ],
};

const scriptures = [
  {
    text: "各人要随本心所酌定的，不要作难，不要勉强，因为捐得乐意的人是神所喜爱的。",
    reference: "哥林多后书 9:7",
  },
  {
    text: "奉献并非一种买卖或交换，乃是敬拜的延伸，是在基督里得释放的心，甘愿参与祂在地上的国度作为。“因为万有都是本于他，倚靠他，归于他。愿荣耀归给他，直到永远。阿们！”",
    reference: "罗马书 11:36",
  },
  {
    text: "愿我们所献的金钱与心志，成为那“馨香之气，是神所收纳所喜悦的祭”（腓立比书 4:18），一同参与荣耀神、扩展祂国度的圣工。",
    reference: "腓立比书 4:18",
  },
  {
    text: "我们深信，一切属灵与物质的恩赐都出于神的主权与慈爱。每一份奉献，都是圣灵在信徒心中所动工的果效，是回应那白白恩典的感恩之举。“我们爱，因为神先爱我们。”",
    reference: "约翰一书 4:19",
  },
  {
    text: "New Creation Life Ministries 所领受的每一笔金钱支持，无论数额大小，都是神百姓甘心乐意的献上，用以推动福音的广传、圣徒的造就与教会的建造，正如经上所记：“你们要将当纳的十分之一全然送入仓库，使我家有粮；以此试试我，是否为你们敞开天上的窗户，倾福与你们，甚至无处可容。”",
    reference: "玛拉基书 3:10",
  },
];

export default function DonatePage({ lang }) {
  const [idx, setIdx] = useState(0);
  const scriptures = SCRIPTURES[lang] || SCRIPTURES.en;

  // 每 5 秒换一张背景+经文
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % scriptures.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [scriptures.length]);

  return (
    <div className="max-w-[1141px] w-full  mx-auto px-4 flex flex-col md:flex-row  md:gap-6 h-auto md:h-[815px] ">
      {/* 左侧 */}
      <div className="w-full md:w-[347px] bg-black rounded-lg overflow-hidden relative h-auto md:h-[730px]">
        {/* 背景图 */}
        <AnimatePresence mode="sync">
          <motion.div
            key={idx}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/donate/bg${idx + 1}.jpg)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
          />
        </AnimatePresence>
        {/* 内容层 */}
        <div className="relative z-10  flex flex-col items-center justify-between p-4 h-full">
          {/* 标题 */}
          <div className="w-[309px] h-[130px] flex mt-10  justify-center ">
            {lang === "zh" ? (
              <>
                <h2 className="text-4xl font-bold text-[#b59959] leading-relaxed">
                  今日奉献
                  <br />
                  <span className="block ml-[2ch]">改变生命</span>
                  <span className="block ml-[4ch]">改变世界</span>
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-[#b59959] leading-relaxed">
                  Give Today
                  <br />
                  <span className="block">Change Lives</span>
                  <span className="block">Change the World</span>
                </h2>
              </>
            )}
          </div>
          {/* 动态经文 */}
          <div className="w-[255px] h-[465px] flex items-center justify-center">
            <blockquote className="text-xl font-normal text-white indent-[2em] leading-relaxed">
              “{scriptures[idx].text}”
              <footer className="mt-2 text-xl">
                ——{scriptures[idx].reference}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* 右侧 */}
      <div className="w-full md:w-[688px] h-auto md:h-[730px] p-4 md:p-8 flex flex-col gap-6 md:gap-24">
        {/* 奉献意义 */}
        <div className=" w-full text-base sm:text-xl font-normal text-[#495859] space-y-4">
          {lang === "zh" ? (
            <>
              <p className="indent-[2em] mt-12">
                无论大小，每一笔奉献, 皆是上帝借着祂子民所成就的恩典记号。New
                Creation Life Ministries 所领受的金钱支持，
                正是弟兄姊妹对神之国度的忠心回应，亦是对教会使命的同工与承担。
              </p>
              <p className="indent-[2em]">
                我们深信，一切属灵与物质的供应皆出于神，为荣耀祂的圣名、装备圣徒、广传福音。
              </p>
              <p className="indent-[2em]">
                愿我们所献，皆本于祂、倚靠祂、归于祂。荣耀唯独归于上帝。
              </p>
            </>
          ) : (
            <>
              <p className="indent-[2em]">
                No matter the size, every gift is a sign of God&apos;s grace at
                work through His people. The financial support received by New
                Creation Life Ministries is a faithful response of the saints to
                God&apos;s Kingdom and a partnership in the Church&apos;s
                mission.
              </p>
              <p className="indent-[2em]">
                We believe that every spiritual and material provision comes
                from God—to glorify His name, equip the saints, and spread the
                gospel.
              </p>
              <p className="indent-[2em]">
                May all we give be from Him, through Him, and for Him—glory to
                God alone.
              </p>
            </>
          )}
        </div>
        {/* 奉献信息 */}
        <div className="w-full bg-[#ece1d1] text-[#016735] font-normal sm:p-8 sm:w-[589px] h-auto sm:h-[351px] mx-auto  rounded-md ">
          {lang === "zh" ? (
            <h3 className="text-xl sm:text-2xl text-center ">奉献信息</h3>
          ) : (
            <h3 className="text-xl sm:text-2xl text-center ">
              Donate Information
            </h3>
          )}

          <div className="flex flex-col gap-2 text-sm sm:text-base text-[#495859]">
            {lang === "zh" ? (
              <>
                <p>
                  <span>支票奉献：</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    请开给 New-Creation&apos;s Life Ministries, NCLM
                  </span>
                </p>
                <p>
                  <span>电子转账与股票奉献：</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    finance.nclm@gmail.com
                  </span>
                </p>
                <p>
                  <span>如未收到奉献收据，请联系：</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    finance.nclm@gmail.com
                  </span>
                </p>
                <p>
                  <span>电邮：</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    canadanclm@gmail.com
                  </span>
                </p>
              </>
            ) : (
              <>
                <p>
                  <span>Check donations:</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    Please make payable to New-Creation&apos;s Life Ministries,
                    NCLM
                  </span>
                </p>
                <p>
                  <span>E-transfers &amp; stock gifts:</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    finance.nclm@gmail.com
                  </span>
                </p>
                <p>
                  <span>If you do not receive a receipt, please contact:</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    finance.nclm@gmail.com
                  </span>
                </p>
                <p>
                  <span>Email:</span>
                  <br />
                  <span className="block indent-[2em] text-[#495859]">
                    canadanclm@gmail.com
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
