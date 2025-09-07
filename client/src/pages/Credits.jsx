import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import { dummyPlans } from '../assets/assets'

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching plans
  const fetchPlans = async () => {
    setPlans(dummyPlans);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 transition-colors">
        💎 Credits Plans
      </h2>

      {/* Grid */}
      {/* Grid：让子项拉满高度 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {plans.map((plan) => {
          const isPro = plan._id?.toLowerCase() === 'pro';
          const isBest = plan.isBest || isPro;

          return (
            <div
              key={plan._id}
              className={[
                // 卡片外层：改成 flex + h-full
                "relative rounded-2xl border shadow-sm overflow-hidden",
                "bg-white/80 dark:bg-[#151318]/80 backdrop-blur",
                "border-gray-200 dark:border-white/10",
                "hover:shadow-lg hover:border-gray-300 dark:hover:border-white/20",
                "transition-all duration-300",
                "flex flex-col h-full"            // ★ 关键：让卡片撑满且竖向布局
              ].join(' ')}
            >
              {isBest && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#A456F7] to-[#3D81F6]" />}

              {/* 卡片主体：也用 flex-col，让内容块可伸展 */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{plan.name}</h3>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    / {plan.credits} credits
                  </span>
                </div>

                <div className="my-5 h-px bg-gray-200 dark:bg-white/10" />

                {/* 特性列表：吃掉剩余空间 */}
                <ul className="space-y-3 flex-1">   {/* ★ 关键：flex-1 */}
                  {plan.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="mt-0.5 w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.543-6.543a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-200 leading-6">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 按钮：自动贴底对齐 */}
                <button
                  className={[
                    "mt-6 w-full rounded-lg py-2.5 text-sm font-semibold transition-all",
                    isBest
                      ? "text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] hover:opacity-95 shadow"
                      : "text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 border border-gray-300/70 dark:border-white/10"
                  ].join(' ')}
                >
                  {isBest ? "Subscribe (Recommended)" : "Subscribe"}
                </button>
              </div>
            </div>
          );
        })}
      </div>


      {/* Small footnote */}
      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
        Prices are in USD. Credits can be used across all supported features.
      </p>
    </div>
  )
}

export default Credits
