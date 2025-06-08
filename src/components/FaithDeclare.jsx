"use client";
import React from "react";
import { motion } from "framer-motion";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lines = [
  "Statement Of Faith",
  "“I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.” – Galatians 2:20",
  "The entire Old and New Testament Bible is inspired by God, is inerrant, the word of life, the road to salvation. We hold it as the highest guidelines of our life and ministries.",
  "The Father, the Son and the Holy Spirit are the eternal triune true God.",
  "God the Father, the creator of all things, is omniscient, omnipresent, omnipotent, holy, righteous, loving, and unchanging.",
  "God the Son, Jesus Christ is the Son of God, in order to save the world, the word became flesh, born of the Virgin Mary, died on the cross to bear the sins of the world, to reconcile men to God, was buried, and rose from the dead on the third day. Now seated at the right hand of God the Father, he will come again to judge the living and the dead.",
  "God the Spirit, also called the Spirit of God, whose work is to convict men of their sins, and bring them to repentance, who lives in the hearts of believers, guides them into the truth, empowers them unto sanctification and good works.",
  "Men were created in the image of God, later fell due to sin, now only through confession and repentance by faith, are born again into eternal life. The believer, after resurrection, will receive a glorious body into the kingdom of God.",
];

export default function FaithDeclare() {
  return (
    <div
      className={`w-9/12 h-4/6 bg-cover bg-center rounded-lg overflow-y-auto p-6 ${ebGaramond.className}`}
      style={{ backgroundImage: "url('/faith_bg.jpg')" }}
    >
      <div className="text-white space-y-0">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.6, duration: 0.8 }}
            className={`${
              index === 0
                ? "text-2xl font-bold tracking-wide text-center mb-4"
                : "text-base leading-relaxed"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
