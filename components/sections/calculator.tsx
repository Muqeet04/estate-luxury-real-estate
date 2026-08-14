"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { CursorTarget } from "@/components/providers/cursor-provider";
import { useSound } from "@/components/providers/sound-provider";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function Calculator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(340000);
  const [downPercent, setDownPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(5.5);

  const { playClick, playHover } = useSound();

  const { downAmount, loanAmount, monthlyPayment, fiveYearValue, totalRoi } = useMemo(() => {
    const down = (propertyPrice * downPercent) / 100;
    const principal = propertyPrice - down;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanYears * 12;

    const monthly =
      monthlyRate > 0
        ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1)
        : principal / totalMonths;

    // Projected 7% annual appreciation for 5 years
    const futureVal = propertyPrice * Math.pow(1.07, 5);
    const roi = ((futureVal - propertyPrice) / propertyPrice) * 100;

    return {
      downAmount: down,
      loanAmount: principal,
      monthlyPayment: Math.round(monthly),
      fiveYearValue: Math.round(futureVal),
      totalRoi: Math.round(roi),
    };
  }, [propertyPrice, downPercent, loanYears, interestRate]);

  return (
    <section id="calculator" className="section-divider bg-ink px-6 py-28 md:px-12">
      <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-brass flex items-center gap-2">
            <span>◆</span>
            <span>REAL-TIME FINANCIAL PLANNING</span>
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tight text-bone">
            Mortgage & ROI<br />
            <span className="font-instrument text-brass italic font-normal">Calculator.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-bone-2 leading-relaxed font-body">
          Adjust loan parameters and evaluate your estimated monthly mortgage payment, down payment requirement, and projected 5-year capital appreciation.
        </p>
      </Reveal>

      {/* Interactive Sliders & Results Grid */}
      <div className="grid gap-px lg:grid-cols-[1.5fr_1fr] border border-line bg-line">
        {/* Left Column: Sliders */}
        <div className="bg-ink-2 p-8 md:p-12 space-y-8">
          {/* Slider 1: Property Price */}
          <div>
            <div className="flex justify-between items-center mb-3 font-mono text-xs">
              <span className="text-bone-2 uppercase tracking-widest">RESIDENCE PRICE</span>
              <span className="text-brass font-bold text-base">{currency.format(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min={150000}
              max={1000000}
              step={10000}
              value={propertyPrice}
              onChange={(e) => {
                setPropertyPrice(Number(e.target.value));
                playClick();
              }}
              onMouseEnter={playHover}
              className="w-full accent-brass bg-ink h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[0.65rem] text-bone-3 mt-1">
              <span>$150,000</span>
              <span>$1,000,000</span>
            </div>
          </div>

          {/* Slider 2: Down Payment % */}
          <div>
            <div className="flex justify-between items-center mb-3 font-mono text-xs">
              <span className="text-bone-2 uppercase tracking-widest">DOWN PAYMENT ({downPercent}%)</span>
              <span className="text-brass font-bold text-base">{currency.format(downAmount)}</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPercent}
              onChange={(e) => {
                setDownPercent(Number(e.target.value));
                playClick();
              }}
              onMouseEnter={playHover}
              className="w-full accent-brass bg-ink h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[0.65rem] text-bone-3 mt-1">
              <span>10% ($15k min)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Slider 3: Loan Tenure */}
          <div>
            <div className="flex justify-between items-center mb-3 font-mono text-xs">
              <span className="text-bone-2 uppercase tracking-widest">LOAN TENURE</span>
              <span className="text-brass font-bold text-base">{loanYears} YEARS</span>
            </div>
            <input
              type="range"
              min={10}
              max={30}
              step={5}
              value={loanYears}
              onChange={(e) => {
                setLoanYears(Number(e.target.value));
                playClick();
              }}
              onMouseEnter={playHover}
              className="w-full accent-brass bg-ink h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[0.65rem] text-bone-3 mt-1">
              <span>10 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Slider 4: Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-3 font-mono text-xs">
              <span className="text-bone-2 uppercase tracking-widest">INTEREST RATE</span>
              <span className="text-brass font-bold text-base">{interestRate}%</span>
            </div>
            <input
              type="range"
              min={3.5}
              max={8.5}
              step={0.25}
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
                playClick();
              }}
              onMouseEnter={playHover}
              className="w-full accent-brass bg-ink h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[0.65rem] text-bone-3 mt-1">
              <span>3.5%</span>
              <span>8.5%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Output Cards */}
        <div className="bg-ink p-8 md:p-12 flex flex-col justify-between space-y-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-brass border-b border-line pb-4 mb-6">
              ESTIMATED MONTHLY BREAKDOWN
            </p>

            <div className="border border-line bg-ink-2 p-6 mb-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-bone-3">ESTIMATED MONTHLY MORTGAGE</p>
              <p className="font-instrument text-5xl text-brass italic font-normal mt-2">
                {currency.format(monthlyPayment)}
                <span className="text-xs font-mono text-bone-2 not-italic"> / mo</span>
              </p>
            </div>

            <dl className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-line/60 pb-2">
                <dt className="text-bone-3">DOWN PAYMENT REQUIRED</dt>
                <dd className="text-bone font-bold">{currency.format(downAmount)}</dd>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <dt className="text-bone-3">FINANCED PRINCIPAL</dt>
                <dd className="text-bone font-bold">{currency.format(loanAmount)}</dd>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <dt className="text-bone-3">5-YR PROJECTED VALUE (+7%/YR)</dt>
                <dd className="text-brass font-bold">{currency.format(fiveYearValue)}</dd>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <dt className="text-bone-3">ESTIMATED CAPITAL APPRECIATION</dt>
                <dd className="text-brass font-bold">+{totalRoi}% ROI</dd>
              </div>
            </dl>
          </div>

          <CursorTarget mode="link">
            <a
              href="#contact"
              className="block w-full text-center bg-brass px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink font-bold transition-all hover:bg-brass-hi shadow-[0_0_20px_rgba(176,141,87,0.3)]"
            >
              APPLY FOR PRE-APPROVED FINANCING →
            </a>
          </CursorTarget>
        </div>
      </div>
    </section>
  );
}
