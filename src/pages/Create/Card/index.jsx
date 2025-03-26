import React from "react";
import { FaCalendar, FaSuitcase } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import "./card.scss";
import DeleteButton from "./DeleteButton";

const Card = ({ job }) => {
  const colors = {
    Reddedildi: "red",
    "Devam Ediyor": "orange",
    Mülakat: "green",
  };
  return (
    <div className="card">
      {/* Head */}

      <section className="head">
        <div className="letter">
          <span>
            {job.company
              .split(" ") // Kelimeleri ayır
              .map((word) => word[0]) // Her kelimenin ilk harfini al
              .join("")}{" "}
            {/* Harfleri birleştir */}
          </span>
        </div>
        <div className="info">
          <p>{job.position} </p>
          <p>{job.company}</p>
        </div>
        <div>
          <DeleteButton id={job.id} />
        </div>
      </section>
      {/* Body */}
      <section className="body">
        {/* Field */}
        <div className="field">
          <i>
            <MdLocationPin />
          </i>
          <p>{job.location}</p>
        </div>
        {/* Field */}
        <div className="field">
          <i>
            <FaSuitcase />
          </i>
          <p>{job.type}</p>
        </div>
        {/* Field */}
        <div className="field">
          <i>
            <FaCalendar />
          </i>
          <p>
            {new Date(job.date).toLocaleDateString("tr", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {/* Field */}
        <div className="status">
          <p style={{ backgroundColor: colors[job.status] }}>{job.status}</p>
        </div>
      </section>
    </div>
  );
};

export default Card;
