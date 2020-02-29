/* eslint-disable react/jsx-fragments */
import React, { useState } from 'react';
import { Card } from '../../UiKit/Card';
import { Button } from '../../UiKit/Button';

import './RegistrationForm.scss';
import { Spinner } from '../../UiKit/Spinner';
import Modal from '../../UiKit/Modal';
import { availableCourses, validDates } from '../../mocks';

/**
 * The Registration Form
 *
 * @returns {JSX.Element} Jsx Element
 */
export default function RegistrationForm() {
  const [selectedCourse, setselectedCourse] = useState(null);
  const [availableSubjects, setavailableSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const [errors, setErrors] = useState({
    course: '',
    subject: '',
    startDate: '',
    additionalNotes: '',
  });

  const handleCourseChange = (index) => {
    setselectedCourse(availableCourses[index].name);
    setavailableSubjects(availableCourses[index].subjects);
    setSelectedSubject(null);
    setErrors(() => ({ ...errors, course: '' }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'subject':
        setErrors({ ...errors, subject: '' });
        return setSelectedSubject(value);

      case 'startDate':
        setErrors({ ...errors, startDate: '' });
        return setStartDate(value);

      case 'additionalNotes':
        setErrors({ ...errors, additionalNotes: '' });
        return setAdditionalNotes(value);

      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      return setErrors(() => ({ ...errors, course: 'please select a course' }));
    }
    if (!selectedSubject) {
      return setErrors(() => ({ ...errors, subject: 'please select a subject' }));
    }
    if (!startDate) {
      return setErrors(() => ({ ...errors, startDate: 'please select a startDate' }));
    }

    if (!validDates.includes(new Date(startDate).toDateString())) {
      return setErrors(() => ({
        ...errors,
        startDate: `Your selected course and subject is not offered on this selected date.
          \n
          Try selecting one from [${validDates}]
          `,
      }));
    }

    if (additionalNotes) {
      if (additionalNotes.length < 20) {
        return setErrors({ ...errors, additionalNotes: 'A minimum of 20 characters is required' });
      }
      if (additionalNotes.length > 500) {
        return setErrors({ ...errors, additionalNotes: 'Should not be more than 500 characters' });
      }
    }

    setIsSubmitting(true);

    return setTimeout(() => {
      setIsSubmitting(false);
      setShowModal(true);
    }, 3000);
  };

  return (
    <div className="row row__mainAxis--center row__crossAxis--center">
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <span className="row row__mainAxis--center row__crossAxis--center">
          Your form has been submitted
        </span>
      </Modal>
      <Card className="col-sm-11 col-md-8 col-lg-4">
        <h1 className="title">Simple Registration Form</h1>
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <div className="col margin__bottom--10">
            <span className="subtitle">Choose Your Course</span>
            {availableCourses.map((course, index) => (
              <label key={course.name} htmlFor={course.name}>
                <input
                  type="radio"
                  id={course.name}
                  name="courses"
                  value={course.name}
                  onChange={() => handleCourseChange(index)}
                  required
                />
                {course.name}
              </label>
            ))}
            <span className="text--error">{errors.course}</span>
          </div>

          <div className="col margin__bottom--10">
            <span className="subtitle">Choose Your Subject</span>
            <label htmlFor="Subject">
              <select id="Subject" name="subject" className="select" onChange={handleChange} required>
                <option value="">Select a subject</option>
                {availableSubjects.map((subjects) => (
                  <option key={subjects} value={subjects}>
                    {subjects}
                  </option>
                ))}
              </select>
            </label>
            <span className="text--error">{errors.subject}</span>
          </div>

          <div className="col margin__bottom--10">
            <span className="subtitle">Choose Your Start Date</span>
            <label htmlFor="StartDate">
              <input
                type="date"
                className="input"
                id="StartDate"
                name="startDate"
                onChange={handleChange}
                required
              />
            </label>
            <span className="text--error">{errors.startDate}</span>
          </div>

          <div className="col margin__bottom--10">
            <span className="subtitle">Additional Notes</span>
            <label htmlFor="AdditionalNotes">
              <textarea
                className="textArea"
                id="AdditionalNotes"
                name="additionalNotes"
                onChange={handleChange}
              />
            </label>
            <span className="text--error">{errors.additionalNotes}</span>
          </div>
          <div className="row">
            <Button
              className="row row__mainAxis--spaceBetween row__crossAxis--center"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
              {isSubmitting && <Spinner center />}
            </Button>

            {isSubmitting && (
              <span className="row row__mainAxis--">
                <Spinner center text="Please wait..." />
              </span>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
