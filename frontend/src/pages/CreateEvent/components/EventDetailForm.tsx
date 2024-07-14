import Field from '@/shared/form/Field';
import { EventDetails } from '@/types/eventTypes';
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
export const DetailEventForm: React.FC<FormComponent> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form as HTMLFormElement);
    const values = Object.fromEntries(formData);
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
        <Field label="Description" name="description" type="text" value={eventInfo.description} handleChange={() => { }} />
        <Field label="Banner URL" name="bannerUrl" type="text" value={eventInfo.bannerUrl} handleChange={() => { }} />
        <Field label="URL" name="url" type="text" value={eventInfo.url} handleChange={() => { }} />
        <div className='flex gap-5 w-full justify-between'>
          <Field label="Location" name="location" type="text" value={eventInfo.location} handleChange={() => { }} />
          <Field label="Timezone" name="timezone" type="text" value={eventInfo.timezone} handleChange={() => { }} />
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
