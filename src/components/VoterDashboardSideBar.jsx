import React from 'react'
import logo from "../assets/votex-high-resolution-logo-white-transparent.png";

const VoterDashboardSideBar = () => {
  return (
      <aside className="w-1/4 border bg-my_blue relative h-full py-5 flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-[20rem]" />
          <br></br>
          <br></br>
          <div className="w-full border-t-2 border-b-2 border-t-white h-12 rounded-xl hover:cursor-pointer hover:shadow-lg">
              <p className="text-center my-2 text-white">Cast Vote</p>
          </div>
          <br></br>
          <br></br>
          <div className="w-full border-t-2 border-b-2 border-t-white h-12 rounded-xl hover:cursor-pointer hover:shadow-lg">
              <p className="text-center my-2 text-white">Show candidates</p>
          </div>
          <br></br>
          <br></br>
          <div className="w-full border-t-2 border-b-2 border-t-white h-12 rounded-xl hover:cursor-pointer hover:shadow-lg">
              <p className="text-center my-2 text-white">Show Results</p>
          </div>
      </aside>
  );
}

export default VoterDashboardSideBar