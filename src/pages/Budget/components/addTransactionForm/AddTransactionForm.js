import React, { useMemo } from "react";
import { Form, Field } from "react-final-form";
import { groupBy, noop } from "lodash";
import { Input } from "components";

const required = (value) => (value ? undefined : "Required");

function AddTransactionForm({ onSubmit = noop, categories, groupCategoryBy }) {
  const groupedCategoriesByParentName = groupCategoryBy ? groupBy(categories, groupCategoryBy) : null;
  const categoryItems = useMemo(
    () =>
      groupedCategoriesByParentName
        ? Object.entries(groupedCategoriesByParentName).map(([parentName, categories]) => (
            <optgroup key={parentName} label={parentName}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </optgroup>
          ))
        : categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )),
    [groupedCategoriesByParentName, categories]
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="description" validate={required}>
            {({ input, meta }) => <Input input={input} meta={meta} label="Description" />}
          </Field>
          <Field name="amount" validate={required} parse={(value) => parseFloat(value, 10)}>
            {({ input, meta }) => <Input input={input} meta={meta} label="Amount" />}
          </Field>
          <Field name="categoryId" validate={required}>
            {({ input, meta }) => <Input input={input} meta={meta} label="Category" />}
          </Field>
          <Field name="date" validate={required}>
            {({ input, meta }) => <Input input={input} meta={meta} label="Date" />}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button type="button" onClick={form.reset} disabled={submitting || pristine}>
              Reset
            </button>
          </div>
        </form>
      )}
    />
  );
}

export default AddTransactionForm;
