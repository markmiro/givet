import { z } from 'zod';
import { BubbleForm } from './bubbler';
import { companySchema } from './schema';

const submitSchema = companySchema;
type SubmitType = z.infer<typeof submitSchema>;

export default function CompanyApp() {
  const onSubmit = (data: SubmitType) => {
    const validate = submitSchema.safeParse(data);

    if (!validate.success) {
      console.error('invalid data', validate.error);
      return;
    }
    // This is where we'd submit the data to the server.
    console.log('finish submit', data);
  };

  return (
    <>
      <BubbleForm className="contents">
        {/* You'd expect submit to be at the BubbleForm but it's not because for submission is only triggered at that level. The actual submission only happens when the data is done bubbling up */}

        <button type="submit">Submit</button>
      </BubbleForm>
    </>
  );
}
