import React from "react";
import { motion } from "framer-motion";

export default function ServezVous() {
  const students = [
    { name: "Olivia Rhye", handle: "@olivia", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/39be3c55c_51b14463a_2f1190870d753151f58657595136f67c584b5c8c.png", role: "Product Designer", email: "olivia@untitledui.com" },
    { name: "Phoenix Baker", handle: "@phoenix", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/406445f9e_ecba4b70e_2780e16db1a4a364d3d872737f7fe9563d7abb29.png", role: "Product Manager", email: "phoenix@untitledui.com" },
    { name: "Lana Steiner", handle: "@lana", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/2dccb5681_bda726251_d688ab8bff2aebfc3cab587865468c4713ecad78.png", role: "Frontend Developer", email: "lana@untitledui.com" },
    { name: "Demi Wilkinson", handle: "@demi", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/5e518f993_54074ee36_c9b5ff46a30dabca6ca1e017e1047cd06f04270b.png", role: "Backend Developer", email: "demi@untitledui.com" },
    { name: "Candice Wu", handle: "@candice", initials: "CW", role: "Fullstack Developer", email: "candice@untitledui.com" },
    { name: "Natali Craig", handle: "@natali", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/20b183e72_3e0790ff1_ca269fff9961afb9c6a84bffddcb988a6fad7166.png", role: "UX Designer", email: "natali@untitledui.com" },
    { name: "Drew Cano", handle: "@drew", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/5d563247f_4fcb427c5_2e2cf1b6f441c6f28c3b0e1e0eb4863eb80b7401.png", role: "UX Copywriter", email: "drew@untitledui.com" },
    { name: "Orlando Diggs", handle: "@orlando", initials: "OD", role: "UI Designer", email: "orlando@untitledui.com" },
    { name: "Andi Lane", handle: "@andi", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/54af1f07c_8afab3db4_e355a90b1eddfbc917a39138b5c2e12ac350dfe8.png", role: "Product Manager", email: "andi@untitledui.com" },
    { name: "Kate Morrison", handle: "@kate", avatar: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/556b531d8_ddaaeaa84_6ec94186cc6e3e60f69ecac1443984f93e6078eb.png", role: "QA Engineer", email: "kate@untitledui.com" },
  ];

  return (
    <div className="min-h-screen bg-figma-primary w-full overflow-x-clip font-sans">
      <div className="flex flex-col gap-8 p-4 md:p-0 md:block md:relative md:w-full md:aspect-[2567/2063] md:bg-figma-primary md:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.10)]">

        {/* Title */}
        <div className="relative md:absolute md:top-[5.86%] md:left-[45.38%] md:w-[13.59%] flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <p className="text-[clamp(26px,1.87vw,48px)] font-semibold font-heading leading-[1.25] tracking-[-0.0208em] text-center text-[#000000]">
              SERVEZ VOUS !
            </p>
          </motion.div>
        </div>

        {/* Dropdown */}
        <div className="relative md:absolute md:top-[14.20%] md:left-[7.71%] md:w-[9.34%] w-full max-w-[240px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col bg-figma-primary shadow-[0px_4px_6px_-2px_rgba(10,13,18,0.03),_0px_12px_16px_-4px_rgba(10,13,18,0.08),_inset_0_0_0_1px_#f5f5f5] rounded-[8px] overflow-clip w-full"
          >
            <div className="bg-figma-secondary w-full h-px" />
            {[
              { name: "Olivia Rhye", img: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/39be3c55c_51b14463a_2f1190870d753151f58657595136f67c584b5c8c.png" },
              { name: "Phoenix Baker", img: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/406445f9e_ecba4b70e_2780e16db1a4a364d3d872737f7fe9563d7abb29.png" },
              { name: "Lana Steiner", img: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/2dccb5681_bda726251_d688ab8bff2aebfc3cab587865468c4713ecad78.png" },
              { name: "Demi Wilkinson", img: "https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/5e518f993_54074ee36_c9b5ff46a30dabca6ca1e017e1047cd06f04270b.png" },
            ].map((user, i) => (
              <div key={i} className="px-4 py-3 text-figma-14 font-medium font-heading text-figma-text-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 flex items-center gap-3 last:border-0 transition-colors">
                <img src={user.img} className="w-6 h-6 rounded-full object-cover" alt={user.name} />
                {user.name}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Line Chart 1 */}
        <div className="relative md:absolute md:top-[13.08%] md:left-[19.20%] md:w-[17.02%] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="aspect-[437/252] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.06),_0px_1px_3px_0px_rgba(10,13,18,0.10)] border border-[#e9eaeb] rounded-[8px] p-4 flex flex-col w-full"
          >
            <div className="text-figma-14 font-medium text-[#535862] mb-4">Active Users</div>
            <div className="flex-1 w-full relative">
              <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path d="M0,40 Q10,30 20,35 T40,20 T60,25 T80,10 T100,15" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                <path d="M0,40 Q10,30 20,35 T40,20 T60,25 T80,10 T100,15 L100,50 L0,50 Z" fill="url(#gradient1)" opacity="0.2" />
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Donut Chart */}
        <div className="relative md:absolute md:top-[11.63%] md:left-[38.60%] md:w-[14.25%] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="aspect-[366/280] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.06),_0px_1px_3px_0px_rgba(10,13,18,0.10)] border border-[#e9eaeb] rounded-[8px] p-6 flex flex-col items-center justify-center w-full"
          >
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  whileInView={{ strokeDasharray: "75, 100" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-purple-500"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-gray-800">75%</span>
              </div>
            </div>
            <div className="mt-6 flex gap-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div>Active</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-200"></div>Inactive</div>
            </div>
          </motion.div>
        </div>

        {/* Table */}
        <div className="relative md:absolute md:top-[9.11%] md:left-[64.47%] md:w-[34%] w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-figma-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.06),_0px_1px_3px_0px_rgba(10,13,18,0.10)] border border-[#e9eaeb] rounded-lg overflow-clip flex flex-col w-full"
          >
            <div className="p-4 border-b border-[#e9eaeb] flex items-center justify-between">
              <h2 className="text-figma-18 font-medium font-heading text-figma-text-2">ETUDIANTS</h2>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[800px] flex flex-col">
                {/* Header */}
                <div className="grid grid-cols-[2fr_1fr_1.5fr_2fr_1.5fr] bg-figma-highlight border-b border-[#e9eaeb]">
                  <div className="py-3 px-6 text-figma-12 font-medium text-[#535862]">Name</div>
                  <div className="py-3 px-6 flex items-center gap-1">
                    <span className="text-figma-12 font-medium text-[#535862]">Status</span>
                    <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/3b7663532_13940192e_31_17335_1229_9053_1224_4551_1221_106890_1037_34077.svg" className="w-[11px] h-[11px]" alt="Sort" />
                  </div>
                  <div className="py-3 px-6 flex items-center gap-1">
                    <span className="text-figma-12 font-medium text-[#535862]">Role</span>
                    <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/7278651ca_784e36d17_31_17335_1229_9075_1224_4551_1221_106791_1054_67_1037_34260.svg" className="w-[13px] h-[13px]" alt="Sort" />
                  </div>
                  <div className="py-3 px-6 text-figma-12 font-medium text-[#535862]">Email address</div>
                  <div className="py-3 px-6 text-figma-12 font-medium text-[#535862]">Teams</div>
                </div>
                {/* Rows */}
                {students.map((s, i) => (
                  <div key={i} className="grid grid-cols-[2fr_1fr_1.5fr_2fr_1.5fr] border-b border-[#e9eaeb] items-center hover:bg-gray-50 transition-colors">
                    <div className="py-4 px-6 flex items-center gap-3">
                      {s.avatar ? (
                        <img src={s.avatar} className="w-10 h-10 rounded-full object-cover" alt={s.name} />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-figma-border flex items-center justify-center text-figma-16 font-medium text-figma-color-14">
                          {s.initials}
                        </div>
                      )}
                      <div>
                        <div className="text-figma-14 font-medium text-figma-text-2">{s.name}</div>
                        <div className="text-figma-14 text-[#535862]">{s.handle}</div>
                      </div>
                    </div>
                    <div className="py-4 px-6">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </div>
                    </div>
                    <div className="py-4 px-6 text-figma-14 text-[#535862]">{s.role}</div>
                    <div className="py-4 px-6 text-figma-14 text-[#535862]">{s.email}</div>
                    <div className="py-4 px-6 flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-[#F9F5FF] border border-white flex items-center justify-center text-[10px] text-[#6941C6] font-medium mix-blend-multiply">D</div>
                      <div className="w-6 h-6 rounded-full bg-[#EFF8FF] border border-white flex items-center justify-center text-[10px] text-[#175CD3] font-medium mix-blend-multiply">P</div>
                      <div className="w-6 h-6 rounded-full bg-[#ECFDF3] border border-white flex items-center justify-center text-[10px] text-[#027A48] font-medium mix-blend-multiply">E</div>
                      <div className="w-6 h-6 rounded-full bg-[#FFF1F3] border border-white flex items-center justify-center text-[10px] text-[#C01048] font-medium mix-blend-multiply">M</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 flex items-center justify-between border-t border-[#e9eaeb] bg-white">
              <button className="px-3 py-2 border border-[#e9eaeb] rounded-[8px] text-figma-14 font-medium text-figma-text-3 bg-white hover:bg-gray-50 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-colors">Previous</button>
              <span className="text-figma-14 font-medium text-figma-text-3">Page 1 of 10</span>
              <button className="px-3 py-2 border border-[#e9eaeb] rounded-[8px] text-figma-14 font-medium text-figma-text-3 bg-white hover:bg-gray-50 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-colors">Next</button>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="relative md:absolute md:top-[25.20%] md:left-[41.76%] md:w-[12.46%] w-full flex flex-col items-center pt-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-2 bg-figma-secondary rounded-full relative"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-figma-color-14 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
              className="absolute top-[-42px] left-[70%] -translate-x-1/2 flex flex-col items-center"
            >
              <div className="py-1.5 px-3 bg-figma-primary shadow-[0px_4px_6px_-2px_rgba(10,13,18,0.03),_0px_12px_16px_-4px_rgba(10,13,18,0.08)] rounded-[8px]">
                <p className="text-figma-12 font-semibold text-figma-text-3">70%</p>
              </div>
              <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/35216e9d6_f303f4a3d_59_21934_1087_57495_1052_506.svg" className="w-3.5 h-2 -mt-[1px]" alt="pointer" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bar Chart */}
        <div className="relative md:absolute md:top-[29.66%] md:left-[22.63%] md:w-[13.36%] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="aspect-[343/240] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.06),_0px_1px_3px_0px_rgba(10,13,18,0.10)] border border-[#e9eaeb] rounded-[8px] p-4 flex flex-col w-full"
          >
            <div className="text-figma-14 font-medium text-[#535862] mb-4">Weekly Activity</div>
            <div className="flex-1 flex items-end gap-2 w-full border-b border-gray-200 pb-2">
              {[40, 70, 45, 90, 65, 80, 55, 100, 30, 60, 85, 50].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                  className="flex-1 bg-purple-500 rounded-t-sm hover:bg-purple-600 transition-colors cursor-pointer"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Icons */}
        <div className="flex flex-wrap gap-4 justify-center md:contents">
          <div className="relative md:absolute md:top-[31.26%] md:left-[43.12%] w-24 md:w-auto aspect-square">
            <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
              <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/ca8536f83_eeef253ec_34_51648_1037_34004.svg" className="w-[60%] h-[60%] object-contain" alt="Close" />
            </motion.div>
          </div>
          <div className="relative md:absolute md:top-[32.13%] md:left-[52.08%] w-24 md:w-auto aspect-square">
            <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
              <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/535185629_3b46ecd25_34_51658_1037_34052.svg" className="w-[60%] h-[60%] object-contain" alt="Minus" />
            </motion.div>
          </div>
          <div className="relative md:absolute md:top-[40.71%] md:left-[43.94%] w-24 md:w-auto aspect-square">
            <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
              <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/925f9ff17_8c81ebcce_34_51653_1037_34079.svg" className="w-[60%] h-[60%] object-contain" alt="Plus" />
            </motion.div>
          </div>
          <div className="relative md:absolute md:top-[43.18%] md:left-[53.95%] w-24 md:w-auto aspect-square">
            <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
              <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/31bbc7d4a_964369662_34_51870_1037_34018.svg" className="w-[60%] h-[60%] object-contain" alt="Document" />
            </motion.div>
          </div>
          <div className="relative md:absolute md:top-[48.27%] md:left-[40.98%] w-24 md:w-auto aspect-square">
            <motion.div whileHover={{ scale: 1.05 }} className="w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer">
              <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/dd5cec2f9_5bf6e5b39_34_51666_1037_34034.svg" className="w-[60%] h-[60%] object-contain" alt="Save" />
            </motion.div>
          </div>
          <div className="relative md:absolute md:top-[45.71%] md:left-[45.73%] w-6 md:w-auto aspect-square hidden md:block">
            <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/ea97d5f9d_af81714da_36_4315_1027_6009.svg" className="w-full h-full object-contain" alt="Icon" />
          </div>
        </div>

        {/* Line Chart 2 */}
        <div className="relative md:absolute md:top-[44.49%] md:left-[13.05%] md:w-[22.94%] w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="aspect-[589/202] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.06),_0px_1px_3px_0px_rgba(10,13,18,0.10)] border border-[#e9eaeb] rounded-[8px] p-4 flex flex-col w-full"
          >
            <div className="text-figma-14 font-medium text-[#535862] mb-4">Performance Trend</div>
            <div className="flex-1 w-full relative">
              <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path d="M0,45 Q10,40 20,42 T40,30 T60,35 T80,15 T100,20" fill="none" stroke="#3b82f6" strokeWidth="2" />
                <path d="M0,45 Q10,40 20,42 T40,30 T60,35 T80,15 T100,20 L100,50 L0,50 Z" fill="url(#gradient2)" opacity="0.2" />
                <defs>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-4 md:contents">
          <div className="relative md:absolute md:top-[54.67%] md:left-[52.08%] md:w-[6.50%] w-full flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-6 bg-purple-600 rounded-full relative transition-colors">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm transition-transform"></div>
            </div>
            <p className="text-figma-16 font-medium font-heading leading-figma-24 text-figma-text-3 whitespace-nowrap">Remember me</p>
          </div>
          <div className="relative md:absolute md:top-[57.34%] md:left-[52.16%] md:w-[6.50%] w-full flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-6 bg-gray-200 rounded-full relative transition-colors">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm transition-transform"></div>
            </div>
            <p className="text-figma-16 font-medium font-heading leading-figma-24 text-figma-text-3 whitespace-nowrap">Remember me</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="relative md:absolute md:top-[77.02%] md:left-[37.43%] md:w-[49.86%] w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", staggerChildren: 0.2 }}
            className="flex flex-col md:flex-row gap-6 w-full"
          >
            <motion.div className="flex flex-col gap-6 p-6 bg-figma-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),_inset_0_0_0_1px_#e9eaeb] rounded-[8px] flex-1 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <p className="text-figma-16 font-semibold font-heading leading-figma-24 text-figma-text-2">Total étudiants</p>
                <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/5400b3aac_e31769dfa_31_40221_1050_145492_1037_33970.svg" className="w-[3px] h-[15px]" alt="More" />
              </div>
              <div>
                <p className="text-[clamp(20px,1.4vw,36px)] font-semibold font-heading leading-[1.2222] tracking-[-0.0194em] text-figma-text-2">2024-2025</p>
                <p className="text-figma-14 font-medium font-heading leading-figma-20 text-[#535862] mt-2">vs année précédente</p>
              </div>
            </motion.div>

            <motion.div className="flex flex-col gap-6 p-6 bg-figma-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),_inset_0_0_0_1px_#e9eaeb] rounded-[8px] flex-1 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <p className="text-figma-16 font-semibold font-heading leading-figma-24 text-figma-text-2">Etudiants à risque de désengagement</p>
                <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/b96e04f8d_a16964028_31_40237_1050_145492_1037_33970.svg" className="w-[3px] h-[15px]" alt="More" />
              </div>
              <div>
                <p className="text-[clamp(20px,1.4vw,36px)] font-semibold font-heading leading-[1.2222] tracking-[-0.0194em] text-figma-text-2">12</p>
                <p className="text-figma-14 font-medium font-heading leading-figma-20 text-[#535862] mt-2">vs mois prédédent</p>
              </div>
            </motion.div>

            <motion.div className="flex flex-col gap-6 p-6 bg-figma-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),_inset_0_0_0_1px_#e9eaeb] rounded-[8px] flex-1 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <p className="text-figma-16 font-semibold font-heading leading-figma-24 text-figma-text-2">Etudiants actifs</p>
                <img src="https://media.base44.com/images/public/6aa44d147c870af1a7c5aa08/7d2e4f396_c0b1def92_31_40253_1050_145492_1037_33970.svg" className="w-[3px] h-[15px]" alt="More" />
              </div>
              <div>
                <p className="text-[clamp(20px,1.4vw,36px)] font-semibold font-heading leading-[1.2222] tracking-[-0.0194em] text-figma-text-2">250</p>
                <p className="text-figma-14 font-medium font-heading leading-figma-20 text-[#535862] mt-2">vs mois précédents</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
