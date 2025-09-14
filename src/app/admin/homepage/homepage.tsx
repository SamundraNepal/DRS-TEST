'use client';

import Spinner from '@/app/components/spinner';
import {
  AdminLogOut,
  DeleteDoctorData,
  HandleAddDoctors,
  HandleAddService,
} from '@/app/database/handle_data';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Doctors {
  id: number;
  doctor_expEn: string;
  doctor_expNe: string;
  doctor_imageURL: string;
  doctor_nameEn: string;
  doctor_nameNe: string;
}

interface Services {
  id: number;
  disease_image: string;
  disease_name: { ne: string; en: string };
  disease_conditions: { ne: string; en: string }[];
  disease_treatments: { ne: string; en: string }[];
}

type Doc_Serv_props = {
  doctorsData: Doctors;
  serviceData: Services;
};

export default function HomePage({ doctorsData, serviceData }: Doc_Serv_props) {
  const doctors = doctorsData || [];
  const services = serviceData || [];

  const [AddDoctors, setAddDoctors] = useState<boolean>(false);
  const [addService, setAddService] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState({});
  const [type, setType] = useState('');

  const router = useRouter();

  //delete box
  const openDeleteBox = (el: any, type: string) => {
    setIsDelete(true);
    setDeleteData(el);
    setType(type);
  };

  const handleDeleteFile = async () => {
    setIsLoading(true);
    try {
      const res = await DeleteDoctorData(deleteData, type);

      if (!res.success) {
        setIsLoading(false);

        return { message: res.message };
      }

      setIsLoading(false);
      setIsDelete(false);
      router.refresh();

      return { message: res.message };
    } catch (error: any) {
      setIsLoading(false);

      throw new Error(error.message);
    }
  };

  const handleOpen = () => {
    setAddDoctors(true);
  };

  const handleSOpen = () => {
    setAddService(true);
  };

  const handleLogOut = async () => {
    try {
      const res = await AdminLogOut();

      if (res.success) {
        router.refresh();
        return { message: res.message };
      }
    } catch (error: any) {
      return { message: error.message };
    }
  };

  return (
    <div className="bg-slate-200 w-full h-[calc(100vh-70px)] text-black flex sm:flex-row flex-col justify-around overflow-auto relative">
      <button
        onClick={handleLogOut}
        className="absolute sm:right-4 top-0 right-0 p-2 bg-blue-600 hover:bg-blue-300 cursor-pointer transition-all duration-300 
      rounded-b-2xl text-white font-bold"
      >
        Log Out
      </button>
      <>
        {isDelete && !isLoading && (
          <DeleteBox
            setIsDelete={setIsDelete}
            handleDeleteFile={handleDeleteFile}
          />
        )}
        {isLoading && <Spinner />}
      </>
      {AddDoctors && (
        <>
          <DoctorsForm setAddDoctors={setAddDoctors} />
        </>
      )}

      {addService && (
        <>
          <ServiceForm setAddService={setAddService} />
        </>
      )}

      <>
        {/* Doctors Section */}
        <div className="border-r-2 w-full p-4 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase">
              Doctors
            </h1>
            <button
              onClick={handleOpen}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-500 transition-all duration-150"
            >
              Add Doctor
            </button>
          </div>

          <div className="backdrop-blur-3xl shadow-2xl shadow-black w-full h-full p-4 rounded-2xl flex flex-col gap-6">
            <h2 className="font-bold text-2xl sm:text-3xl text-center uppercase">
              Available Doctors
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-center overflow-y-auto max-h-[70vh]">
              {Array.isArray(doctors) &&
                doctors?.map((doctor: Doctors, index: number) => (
                  <div
                    key={index}
                    className="border-2 p-4 flex flex-col items-center w-full rounded-2xl bg-gray-200 shadow-2xl shadow-black gap-4 relative"
                  >
                    <button
                      onClick={() => openDeleteBox(doctor.id, 'doc')}
                      className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-2xl hover:bg-blue-300 font-bold text-sm"
                    >
                      Delete
                    </button>

                    <div className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-black rounded-full overflow-hidden shadow-lg flex justify-center items-center">
                      <Image
                        src={doctor.doctor_imageURL}
                        alt={`${doctor.doctor_nameEn} Image`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>

                    <div className="text-center space-y-1 text-sm sm:text-base">
                      <h3 className="font-semibold">
                        English Name: {doctor.doctor_nameEn}
                      </h3>
                      <h3 className="font-semibold">
                        Nepali Name: {doctor.doctor_nameNe}
                      </h3>
                    </div>

                    <div className="text-center space-y-1 text-sm sm:text-base">
                      <p className="text-gray-700">
                        Experience (EN): {doctor.doctor_expEn}
                      </p>
                      <p className="text-gray-700">
                        Experience (NE): {doctor.doctor_expNe}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="border-r-2 w-full p-4 flex flex-col gap-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase">
              Services
            </h1>
            <button
              onClick={handleSOpen}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-500 transition-all duration-150"
            >
              Add Service
            </button>
          </div>

          <div className="backdrop-blur-3xl shadow-2xl shadow-black w-full p-4 rounded-2xl flex flex-col gap-6 h-full">
            <h2 className="font-bold text-2xl sm:text-3xl text-center uppercase">
              Available Services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-center overflow-y-auto max-h-[70vh]">
              {Array.isArray(services) &&
                services?.map((service: Services, index: number) => (
                  <div
                    key={index}
                    className="border-2 p-4 flex flex-col items-center w-full rounded-2xl bg-gray-200 shadow-2xl shadow-black gap-4 relative"
                  >
                    <button
                      onClick={() => openDeleteBox(service.id, 'ser')}
                      className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-2xl hover:bg-blue-300 font-bold text-sm"
                    >
                      Delete
                    </button>

                    <div className="w-32 h-32 sm:w-40 sm:h-40 border-2 border-black rounded-full overflow-hidden shadow-lg flex justify-center items-center">
                      <Image
                        src={service.disease_image}
                        alt="DiseaseImage"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-sm sm:text-base text-center">
                      <p className="font-bold">Disease Name (EN):</p>
                      <p>{service.disease_name.en}</p>
                      <p className="font-bold">Disease Name (NE):</p>
                      <p>{service.disease_name.ne}</p>
                    </div>

                    <div className="flex flex-col gap-4 w-full border-t-2 pt-2 text-sm sm:text-base">
                      <div>
                        <h3 className="font-bold">Disease Conditions</h3>
                        <ul className="flex flex-col gap-1 border-2 rounded-2xl p-2">
                          {service.disease_conditions.map((cond, idx) => (
                            <li key={idx} className="flex flex-col">
                              <span>{cond.en}</span>
                              <span>{cond.ne}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-bold">Disease Treatments</h3>
                        <ul className="flex flex-col gap-1 border-2 p-2 rounded-2xl">
                          {service.disease_treatments.map((treat, idx) => (
                            <li key={idx} className="flex flex-col">
                              <span>{treat.en}</span>
                              <span>{treat.ne}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

type doctorsFormProps = {
  setAddDoctors: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Doctor {
  image: File | null;
  doctors_name: { ne: string; en: string };
  doctor_email: string;
  doctors_experince: { ne: string; en: string };
}

function DoctorsForm({ setAddDoctors }: doctorsFormProps) {
  const router = useRouter();
  const [doctorForm, setDoctorForm] = useState<Doctor>({

    doctor_email: '',
    image: null,
    doctors_name: { ne: '', en: '' },
    doctors_experince: { ne: '', en: '' },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;

    if (type == 'file') {
      // @ts-expect-error this is needed
      setDoctorForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setDoctorForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;

    if (name == 'en') {
      setDoctorForm((prev) => ({
        ...prev,
        doctors_name: { ...prev.doctors_name, en: value },
      }));
    } else {
      setDoctorForm((prev) => ({
        ...prev,
        doctors_name: { ...prev.doctors_name, ne: value },
      }));
    }
  };

  const handleDocExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == 'en') {
      setDoctorForm((prev) => ({
        ...prev,
        doctors_experince: { ...prev.doctors_experince, en: value },
      }));
    } else {
      setDoctorForm((prev) => ({
        ...prev,
        doctors_experince: { ...prev.doctors_experince, ne: value },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    const jsonData = {
      name: doctorForm.doctors_name,
      experience: doctorForm.doctors_experince,
      doctor_email: doctorForm.doctor_email,
    };

    // @ts-expect-error this is needed
    formData.append('imageFile', doctorForm.image);
    formData.append('json', JSON.stringify(jsonData));

    try {
      const res = await HandleAddDoctors({ formData });

      if (!res.success) {
        console.log(res);
        setIsLoading(false);
        return { message: res.message };
      }

      setAddDoctors(false);
      router.refresh();
    } catch (error: any) {
      setIsLoading(false);

      throw new Error(error.message);
    }
  };

  const handleClose = () => {
    setAddDoctors(false);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
      {isLoading && <Spinner />}

      {!isLoading && (
        <form
          onSubmit={handleSubmit}
          className="w-11/12 sm:w-4/5 md:w-3/5 max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            Add Doctor Details
          </h2>

          {/* Doctor Image */}
          <div className="flex flex-col gap-2">
            <label className="text-base sm:text-lg font-medium text-gray-700">
              Doctor Image
            </label>
            <input
              name="image"
              onChange={handleChange}
              type="file"
              required
              accept=".jpg,.png"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Doctor Name */}
          <div className="flex flex-col gap-2">
            <label className="text-base sm:text-lg font-medium text-gray-700">
              Doctor Name
            </label>
            <input
              name="en"
              value={doctorForm.doctors_name.en}
              onChange={handleNameChange}
              type="text"
              placeholder="Enter doctor's full name in English"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
            <input
              name="ne"
              value={doctorForm.doctors_name.ne}
              onChange={handleNameChange}
              type="text"
              placeholder="Enter doctor's full name in Nepali"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Doctor Email */}
          <div className="flex flex-col gap-2">
            <label className="text-base sm:text-lg font-medium text-gray-700">
              Doctor Email
            </label>
            <input
              required
              name="doctor_email"
              value={doctorForm.doctor_email}
              onChange={handleChange}
              type="email"
              placeholder="Enter doctor email address"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Doctor Experience */}
          <div className="flex flex-col gap-2">
            <label className="text-base sm:text-lg font-medium text-gray-700">
              Doctor Experience (Years)
            </label>
            <input
              name="en"
              value={doctorForm.doctors_experince.en}
              onChange={handleDocExpChange}
              type="number"
              placeholder="e.g., 12"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
            <input
              name="ne"
              value={doctorForm.doctors_experince.ne}
              onChange={handleDocExpChange}
              type="number"
              placeholder="e.g., १२"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Submit & Cancel */}
          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full py-2 sm:py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md text-sm sm:text-base"
            >
              Save Doctor
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2 sm:py-3 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-all shadow-md text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

type serviceFormProps = {
  setAddService: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Service {
  image: File | null;
  disease_name: { ne: string; en: string };
  disease_conditions: { ne: string; en: string }[];
  disease_treatments: { ne: string; en: string }[];
}

function ServiceForm({ setAddService }: serviceFormProps) {
  const [serviceForm, setServiceForm] = useState<Service>({
    image: null,
    disease_name: { ne: '', en: '' },
    disease_conditions: [{ en: '', ne: '' }],
    disease_treatments: [{ en: '', ne: '' }],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numberOfConditions, setNumberOfConditions] = useState<number>(1);
  const [numberOfTreatment, setNumberOfTreatment] = useState<number>(1);

  const router = useRouter();

  const handleClose = () => {
    setAddService(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;

    if (type === 'file') {
      
      // @ts-expect-error this is needed
      setServiceForm((prev) => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setServiceForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'en') {
      setServiceForm((prev) => ({
        ...prev,
        disease_name: {
          ...prev.disease_name, // keep existing fields
          en: value, // update only "en"
        },
      }));
    } else {
      setServiceForm((prev) => ({
        ...prev,
        disease_name: {
          ...prev.disease_name, // keep existing fields
          ne: value, // update only "en"
        },
      }));
    }
  };

  const handleConditionsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;

    setServiceForm((prev) => {
      const newConditions = [...prev.disease_conditions];
      const updatedConditions = { ...newConditions[index] };

      if (field === 'en' || field === 'ne') {
        updatedConditions[field] = value;
      }

      newConditions[index] = updatedConditions;

      return { ...prev, disease_conditions: newConditions };
    });
  };

  const handleTreatmentChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const field = e.target.name;
    const value = e.target.value;

    setServiceForm((prev) => {
      const newTreatment = [...prev.disease_treatments];
      const updatedTreatment = { ...newTreatment[index] };

      if (field === 'en' || field === 'ne') {
        updatedTreatment[field] = value;
      }

      newTreatment[index] = updatedTreatment;

      return { ...prev, disease_treatments: newTreatment };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    const jsonData = {
      disease_name: serviceForm.disease_name,
      disease_conditions: serviceForm.disease_conditions,
      disease_treatments: serviceForm.disease_treatments,
    };

    // @ts-expect-error this is needed
    formData.append('imageFile', serviceForm?.image);
    formData.append('json', JSON.stringify(jsonData));

    try {
      const res = await HandleAddService({ formData });

      if (!res.success) {
        setIsLoading(false);

        return { message: res.message };
      }

      router.refresh();

      setIsLoading(false);
      setAddService(false);
    } catch (error: any) {
      setIsLoading(false);

      throw new Error(error.message);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
      {isLoading && <Spinner />}

      {!isLoading && (
        <form
          onSubmit={handleSubmit}
          className="w-11/12 sm:w-4/5 md:w-3/5 max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            Add Service
          </h2>

          {/* Disease Image */}
          <div className="flex flex-col gap-2">
            <label className="text-base sm:text-lg font-medium text-gray-700">
              Disease Image
            </label>
            <input
              name="image"
              onChange={handleChange}
              type="file"
              required
              accept=".jpg,.png"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Disease Name */}
          <div className="flex flex-col gap-2">
            <label className="text-base sm:text-lg font-medium text-gray-700">
              Disease Name
            </label>
            <input
              name="en"
              type="text"
              value={serviceForm.disease_name.en}
              onChange={handleNameChange}
              placeholder="Enter Disease name in English"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
            <input
              name="ne"
              type="text"
              value={serviceForm.disease_name.ne}
              onChange={handleNameChange}
              placeholder="Enter Disease name in Nepali"
              className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Disease Conditions */}
          <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
            <div className="flex items-center gap-3 sm:gap-4">
              <label className="text-base sm:text-lg font-medium text-gray-700">
                Disease Conditions
              </label>
              <input
                value={numberOfConditions}
                onChange={(e) => setNumberOfConditions(Number(e.target.value))}
                type="number"
                placeholder="Count"
                className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none w-2/5 text-sm sm:text-base"
              />
            </div>

            {Array.from({ length: numberOfConditions }).map((_, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="text-sm sm:text-base font-medium">
                  Condition {index + 1}
                </p>
                <input
                  name="en"
                  onChange={(e) => handleConditionsChange(index, e)}
                  type="text"
                  placeholder="In English: Chronic Venous Insufficiency"
                  className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
                />
                <input
                  name="ne"
                  onChange={(e) => handleConditionsChange(index, e)}
                  type="text"
                  placeholder="In Nepali: क्रोनिक भेनस इन्सफिसियन्सी"
                  className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
                />
              </div>
            ))}
          </div>

          {/* Disease Treatments */}
          <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
            <div className="flex items-center gap-3 sm:gap-4">
              <label className="text-base sm:text-lg font-medium text-gray-700">
                Disease Treatments
              </label>
              <input
                value={numberOfTreatment}
                onChange={(e) => setNumberOfTreatment(Number(e.target.value))}
                type="number"
                placeholder="Count"
                className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none w-2/5 text-sm sm:text-base"
              />
            </div>

            {Array.from({ length: numberOfTreatment }).map((_, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="text-sm sm:text-base font-medium">
                  Treatment {index + 1}
                </p>
                <input
                  name="en"
                  onChange={(e) => handleTreatmentChange(index, e)}
                  type="text"
                  placeholder="In English: Endovenous Laser Ablation (EVLA)"
                  className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
                />
                <input
                  name="ne"
                  onChange={(e) => handleTreatmentChange(index, e)}
                  type="text"
                  placeholder="In Nepali: एन्डोभेनस लेजर अब्लेसन"
                  className="border rounded-xl p-2 sm:p-3 bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm sm:text-base"
                />
              </div>
            ))}
          </div>

          {/* Submit & Cancel */}
          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full py-2 sm:py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md text-sm sm:text-base"
            >
              Save Service
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2 sm:py-3 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-all shadow-md text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

type deleteBoxProps = {
  handleDeleteFile: () => Promise<{ message: any } | undefined>;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteBox({ setIsDelete, handleDeleteFile }: deleteBoxProps) {
  const handleCloseDelete = () => {
    setIsDelete(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">Delete Confirmation</h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete <span className="font-bold"></span>?
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCloseDelete}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteFile}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
