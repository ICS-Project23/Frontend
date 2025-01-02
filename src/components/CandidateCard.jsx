import React from 'react'

const CandidateCard = ({candidate}) => {
  return (
      <div className="carousel-item rounded-lg flex flex-col bg-base-100 w-96 shadow-xl m-5 hover:shadow-2xl hover:scale-105 hover:cursor-pointer duration-300">
          <figure>
              <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
              />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{candidate.name}</h2>
              <p className="font-extralight">{candidate.dob}</p>
              <div className="card-actions justify-end">
                  <div className="badge badge-outline">{candidate.party}</div>
              </div>
          </div>
      </div>
  );
}

export default CandidateCard