import React, { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import {
  NvButton,
  NvFielddropdown,
  NvFielddropdownitem,
  NvFieldselect,
  NvFieldtext,
} from "@nova-design-system/nova-react";

type FormData = {
  text: string;
  dropdown: string;
  select: string;
};

const App: React.FC = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      dropdown: "1",
      text: "",
      select: "",
    },
  });

  const [formData, setFormData] = useState<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form submitted with:", data);
    setFormData(data);
  };

  return (
    <form
      className="p-8 flex flex-col gap-4"
      id="test-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Text Input - Required */}
      <NvFieldtext
        label="Text"
        required
        {...register("text", { required: "Text is required" })}
        error={!!errors.text}
        errorDescription={errors.text?.message}
      />

      <NvFieldselect
        label="Select"
        {...register("select", { required: "Select is required" })}
        error={!!errors.select}
        errorDescription={errors.select?.message}
      >
        <option value="1">Item 1</option>
        <option value="2">Item 2</option>
        <option value="3">Item 3</option>
      </NvFieldselect>

      {/* Dropdown - Required Using Controller */}
      <Controller
        name="dropdown"
        control={control}
        rules={{ required: "Please select an option" }}
        render={({ field }) => (
          <NvFielddropdown
            role="combobox"
            label="Dropdown"
            value={field.value}
            onValueChanged={(event) => field.onChange(event.detail)}
            error={!!errors.dropdown}
            errorDescription={errors.dropdown?.message}
          >
            <ul slot="content">
              <NvFielddropdownitem value="1" label="Item 1" />
              <NvFielddropdownitem value="2" label="Item 2" />
              <NvFielddropdownitem value="3" label="Item 3" />
            </ul>
          </NvFielddropdown>
        )}
      />

      {/* Submit Button */}
      <NvButton form="test-form" type="submit">
        Submit
      </NvButton>

      <div data-testid="results">{JSON.stringify(formData)}</div>
    </form>
  );
};

export default App;
