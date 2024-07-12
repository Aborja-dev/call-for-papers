import { useNavigate } from "react-router";

export const EventDisplay = ({ event }) => {
  const navigate = useNavigate()
  return (
    <>
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src={event.bannerUrl} alt={event.name} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{event.typeEvent}</div>
          <a href={event.url} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{event.name}</a>
          <p className="mt-2 text-gray-500">{event.description}</p>
          <div className="mt-4">
            <div className="text-sm text-gray-600">Location: {event.location}</div>
            <div className="text-sm text-gray-600">Timezone: {event.timezone}</div>
            <div className="text-sm text-gray-600">Status: {event.status}</div>
            <div className="text-sm text-gray-600">Starting Date: {new Date(event.startingDate).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Ending Date: {new Date(event.endingDate).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
    <button onClick={() => navigate(-1)} >Volver</button>
    </>
  );
};