import React, { useState } from 'react'
import style from './Footer.module.css'

export default function Footer() {



    
  return <>
    
    <footer className=''>
  <div className=" bg-violet-900 pt-9 fixed-bottom py-11">
    <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
      <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
        <div className="md:w-[316px]">
          <h1 className="text-white font-extrabold">
            <span className="text-rose-600">YOUR</span>LOGO
          </h1>
          <p className="mt-[18px] text-[15px] font-normal text-white/[80%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, fugit non. Incidunt dolorum adipisci, tempore asperiores nemo odio facere officiis enim animi placeat eaque nesciunt alias beatae id, at dicta.
          </p>
          <div className="mt-[18px] flex gap-4">
            <a className="hover:scale-110" target="_blank" rel="noreferrer" href="#">
              <img alt="facebook icon" loading="lazy" width="36" height="36" decoding="async" src="https://www.englishyaari.com/img/facebook.svg" />
            </a>
            <a className="hover:scale-110" target="_blank" rel="noreferrer" href="/">
              <img alt="linkedin icon" loading="lazy" width="36" height="36" decoding="async" src="https://www.englishyaari.com/img/linkdin.svg" />
            </a>
            <a className="hover:scale-110" target="_blank" rel="noreferrer" href="/">
              <img alt="instagram icon" loading="lazy" width="36" height="36" decoding="async" src="https://www.englishyaari.com/img/instagram1.svg" />
            </a>
            <a className="hover:scale-110" target="_blank" rel="noreferrer" href="#">
              <img alt="twitter icon" loading="lazy" width="36" height="36" decoding="async" src="https://www.englishyaari.com/img/twitter.svg" />
            </a>
            <a className="hover:scale-110" target="_blank" rel="noreferrer" href="https://www.youtube.com/">
              <img alt="youtube icon" loading="lazy" width="36" height="36" decoding="async" src="https://www.englishyaari.com/img/youtube.svg" />
            </a>
          </div>
        </div>
        <div className="md:w-[316px]">
          <div className="mt-[23px] flex">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.8472 14.8554L16.4306 12.8764L16.4184 12.8707C16.1892 12.7727 15.939 12.7333 15.6907 12.7562C15.4424 12.7792 15.2037 12.8636 14.9963 13.002C14.9718 13.0181 14.9484 13.0357 14.9259 13.0545L12.6441 14.9998C11.1984 14.2976 9.70595 12.8164 9.00376 11.3895L10.9519 9.07294C10.9706 9.0495 10.9884 9.02606 11.0053 9.00075C11.1407 8.79384 11.2229 8.55667 11.2445 8.31035C11.2661 8.06402 11.2264 7.81618 11.1291 7.58887V7.57762L9.14438 3.15356C9.0157 2.85662 8.79444 2.60926 8.51362 2.44841C8.2328 2.28756 7.9075 2.22184 7.58626 2.26106C6.31592 2.42822 5.14986 3.05209 4.30588 4.01615C3.4619 4.98021 2.99771 6.21852 3.00001 7.49981C3.00001 14.9436 9.05626 20.9998 16.5 20.9998C17.7813 21.0021 19.0196 20.5379 19.9837 19.6939C20.9477 18.85 21.5716 17.6839 21.7388 16.4136C21.7781 16.0924 21.7125 15.7672 21.5518 15.4864C21.3911 15.2056 21.144 14.9843 20.8472 14.8554ZM16.5 19.4998C13.3185 19.4963 10.2682 18.2309 8.01856 15.9813C5.76888 13.7316 4.50348 10.6813 4.50001 7.49981C4.49648 6.58433 4.82631 5.69887 5.42789 5.00879C6.02947 4.3187 6.86167 3.87118 7.76907 3.74981C7.7687 3.75355 7.7687 3.75732 7.76907 3.76106L9.73782 8.16731L7.80001 10.4867C7.78034 10.5093 7.76247 10.5335 7.74657 10.5589C7.60549 10.7754 7.52273 11.0246 7.5063 11.2825C7.48988 11.5404 7.54035 11.7981 7.65282 12.0307C8.5022 13.7679 10.2525 15.5051 12.0084 16.3536C12.2428 16.465 12.502 16.5137 12.7608 16.495C13.0196 16.4762 13.2692 16.3907 13.485 16.2467C13.5091 16.2305 13.5322 16.2129 13.5544 16.1942L15.8334 14.2498L20.2397 16.2232C20.2397 16.2232 20.2472 16.2232 20.25 16.2232C20.1301 17.1319 19.6833 17.9658 18.9931 18.5689C18.3028 19.172 17.4166 19.5029 16.5 19.4998Z" fill="white"></path>
              </svg>
            </div>
            <div className="ml-[18px]">
              <a href="tel:+911800123444" className="font-Inter text-[14px] font-medium text-white">+91 1800123444</a>
              <p className="font-Inter text-[12px] font-medium text-white">Support Number</p>
            </div>
          </div>
          <div className="mt-[23px] flex">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
              <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0H1C0.801088 0 0.610322 0.0790178 0.46967 0.21967C0.329018 0.360322 0.25 0.551088 0.25 0.75V13.5C0.25 13.8978 0.408035 14.2794 0.68934 14.5607C0.970644 14.842 1.35218 15 1.75 15H18.25C18.6478 15 19.0294 14.842 19.3107 14.5607C19.592 14.2794 19.75 13.8978 19.75 13.5V0.75C19.75 0.551088 19.671 0.360322 19.5303 0.21967C19.3897 0.0790178 19.1989 0 19 0ZM18.25 1.1755V1.38525L10.852 8.78325C10.8035 8.83265 10.7488 8.87269 10.6895 8.90122C10.6301 8.92975 10.5669 8.94632 10.5025 8.95013C10.4381 8.95395 10.3741 8.94496 10.3141 8.92357C10.254 8.90219 10.1994 8.86907 10.153 8.82625L1.75 1.42825V1.1755H18.25ZM1.75 13.5V2.4985L6.896 7.08075L1.75 13.5ZM2.6945 13.75L8.0965 8.05075L8.97775 8.82625C9.08295 8.9221 9.20953 8.99565 9.34841 9.04188C9.48728 9.0881 9.63579 9.10579 9.782 9.09325C9.92821 9.0807 10.0688 9.03843 10.1924 8.97016C10.316 8.90189 10.4196 8.80988 10.4955 8.7005L18.25 2.4985V13.5C18.25 13.6989 18.171 13.8897 18.0303 14.0303C17.8897 14.171 17.6989 14.25 17.5 14.25H2.5C2.30109 14.25 2.11032 14.171 1.96967 14.0303C1.82902 13.8897 1.75 13.6989 1.75 13.5H2.6945Z" fill="white"></path>
              </svg>
            </div>
            <div className="ml-[18px]">
              <a href="mailto:Support@yourlogo.com" className="font-Inter text-[14px] font-medium text-white">Support@yourlogo.com</a>
              <p className="font-Inter text-[12px] font-medium text-white">Email Address</p>
            </div>
          </div>
        </div>
        <div className="md:w-[316px]">
          <div className="mt-[23px] flex">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.7436 1.25H5.25664C2.92489 1.25 1.25 2.92489 1.25 5.25664V14.7436C1.25 17.0754 2.92489 18.75 5.25664 18.75H14.7436C17.0754 18.75 18.75 17.0754 18.75 14.7436V5.25664C18.75 2.92489 17.0754 1.25 14.7436 1.25ZM15.8549 14.7436C15.8549 15.184 15.6744 15.6069 15.3537 15.9276C15.0331 16.2483 14.6101 16.4288 14.1697 16.4288H5.25664C4.81617 16.4288 4.39323 16.2483 4.07254 15.9276C3.75186 15.6069 3.57143 15.184 3.57143 14.7436V5.25664C3.57143 4.81617 3.75186 4.39323 4.07254 4.07254C4.39323 3.75186 4.81617 3.57143 5.25664 3.57143H14.1697C14.6101 3.57143 15.0331 3.75186 15.3537 4.07254C15.6744 4.39323 15.8549 4.81617 15.8549 5.25664V14.7436Z" fill="white"></path>
              </svg>
            </div>
            <div className="ml-[18px]">
              <p className="font-Inter text-[14px] font-medium text-white">Mon to Sat: 10 am to 6 pm</p>
              <p className="font-Inter text-[12px] font-medium text-white">Working Hours</p>
            </div>
          </div>
          <div className="mt-[23px] flex">
            <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0.000244141C4.48529 0.000244141 0 4.20438 0 9.49863C0 16.6223 9.03083 23.297 9.41045 23.5472C9.58767 23.6645 9.79379 23.7274 10 23.7274C10.2062 23.7274 10.4123 23.6645 10.5895 23.5472C10.9692 23.297 20 16.6223 20 9.49863C20 4.20438 15.5147 0.000244141 10 0.000244141ZM10 21.4713C7.2759 19.5533 1.42857 14.7695 1.42857 9.49863C1.42857 5.19915 5.28879 1.75776 10 1.75776C14.7112 1.75776 18.5714 5.19915 18.5714 9.49863C18.5714 14.7695 12.7241 19.5533 10 21.4713ZM10 5.21391C8.01566 5.21391 6.40306 6.77458 6.40306 8.73554C6.40306 10.6965 8.01566 12.2571 10 12.2571C11.9843 12.2571 13.5969 10.6965 13.5969 8.73554C13.5969 6.77458 11.9843 5.21391 10 5.21391ZM10 10.5C8.90582 10.5 8 9.64735 8 8.5935C8 7.53965 8.90582 6.687 10 6.687C11.0942 6.687 12 7.53965 12 8.5935C12 9.64735 11.0942 10.5 10 10.5Z" fill="white"></path>
              </svg>
            </div>
            <div className="ml-[18px]">
              <a href="https://goo.gl/maps/LPo9mEybUYv" className="font-Inter text-[14px] font-medium text-white">Meerut Road, Ghaziabad</a>
              <p className="font-Inter text-[12px] font-medium text-white">Office Address</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

  
  </>
}
