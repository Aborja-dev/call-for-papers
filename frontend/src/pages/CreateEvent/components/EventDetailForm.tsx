import React, { useRef } from 'react';

const eventInfo = {
  description: "description",
  bannerUrl: "www.url.com",
  url: "ww.url.com",
  location: "mexico",
  timezone: "GMT+6",
};
interface FormComponent {
    onSubmit: (data: EventDetails) => void
}
export const DetailEventForm: React.FC<FormComponent> = ({onSubmit}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form as HTMLFormElement);
    const values = Object.fromEntries(formData) ;
    const data: EventDetails = {
      description: values.description as string,
      bannerUrl: values.bannerUrl as string,
      url: values.url as string,
      location: values.location as string,
      timezone: values.timezone as string,
    }
    onSubmit(data)
  };

  return (
    <div className=" mx-auto rounded-xl shadow-md overflow-hidden">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-500">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={eventInfo.description}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="bannerUrl" className="block text-sm font-medium text-gray-500">
            Banner URL
          </label>
          <input
            type="text"
            name="bannerUrl"
            id="bannerUrl"
            defaultValue={eventInfo.bannerUrl}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-500">
            URL
          </label>
          <input
            type="text"
            name="url"
            id="url"
            defaultValue={eventInfo.url}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className='flex gap-5 w-full justify-between'>
        <div className='w-full'>
          <label htmlFor="location" className="block text-sm font-medium text-gray-500">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            defaultValue={eventInfo.location}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className='w-full'>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-500">
            Timezone
          </label>
          <input
            type="text"
            name="timezone"
            id="timezone"
            defaultValue={eventInfo.timezone}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
