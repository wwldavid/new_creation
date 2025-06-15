"use client";
import React from "react";
import { motion } from "framer-motion";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// const lines = [
//   "Statement Of Faith",
//   "“I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.” – Galatians 2:20",
//   "The entire Old and New Testament Bible is inspired by God, is inerrant, the word of life, the road to salvation. We hold it as the highest guidelines of our life and ministries.",
//   "The Father, the Son and the Holy Spirit are the eternal triune true God.",
//   "God the Father, the creator of all things, is omniscient, omnipresent, omnipotent, holy, righteous, loving, and unchanging.",
//   "God the Son, Jesus Christ is the Son of God, in order to save the world, the word became flesh, born of the Virgin Mary, died on the cross to bear the sins of the world, to reconcile men to God, was buried, and rose from the dead on the third day. Now seated at the right hand of God the Father, he will come again to judge the living and the dead.",
//   "God the Spirit, also called the Spirit of God, whose work is to convict men of their sins, and bring them to repentance, who lives in the hearts of believers, guides them into the truth, empowers them unto sanctification and good works.",
//   "Men were created in the image of God, later fell due to sin, now only through confession and repentance by faith, are born again into eternal life. The believer, after resurrection, will receive a glorious body into the kingdom of God.",
// ];

const lines = [
  "信仰宣言",
  "“我已经与基督同钉十字架，如今活着的不再是我，乃是基督在我里面活着。我如今在肉身活着，是因信神的儿子而活；他爱我，为我舍己。” —— 加拉太书 2:20",
  "整个旧约和新约圣经都是神所默示的，圣经无误，是生命的道，也是得救的途径。我们将圣经视为我们生命和事工最高的准则。",
  "父、子、圣灵三位一体的真神是永恒真实的神。",
  "神——父，是万物的创造者；祂全知、全在、全能，圣洁、公义、慈爱，并且永不改变。",
  "神——子，耶稣基督，是神的独生子；为了拯救世人，道成肉身，出生于童贞女马利亚，替世人担当罪孽，钉十字架而死，埋葬后第三天复活。如今祂坐在父神的右边，将来必再来审判活人死人。",
  "神——圣灵，也称神的灵；祂的工作是使人罪得定罪，引导人悔改，住在信徒心中，引导他们认识真理，并赐能力使人得成圣、行各样善事。",
  "人原是按神的形像所造，后因犯罪堕落，如今唯有通过认罪、悔改并凭信心重生，才能得着永生。信徒在复活后，将得荣耀的身体，进入神的国度。",
];
export default function FaithDeclare() {
  return (
    <div className={`w-full h-auto  p-2 ${ebGaramond.className}`}>
      <div className="text-[#01652e] space-y-4 ">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.6, duration: 0.8 }}
            className={`${
              index === 0
                ? "tect-2xl md:text-3xl font-bold tracking-wide text-center mb-4"
                : "indent-8 text-sm sm:text-base md:text-lg lg:text-xl"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
