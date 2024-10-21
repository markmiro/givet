import { z } from 'zod';
import { BubbleForm } from './bubbler';
import { companySchema } from './schema';
import { AutoForm } from '@autoform/mantine';
import { ZodProvider } from '@autoform/zod';

const formSchema = companySchema;
type FormType = z.infer<typeof formSchema>;
const schemaProvider = new ZodProvider(formSchema);

export default function CompanyApp() {
  const onSubmit = (data: FormType) => {
    const validate = formSchema.safeParse(data);

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

        <AutoForm
          schema={schemaProvider}
          onSubmit={(data, form) => {
            console.log(data);
          }}
        />
        <button type="submit">Submit</button>
      </BubbleForm>
    </>
  );
}
