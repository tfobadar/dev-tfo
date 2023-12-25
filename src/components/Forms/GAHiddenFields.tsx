import { WindowWithGtag } from '@/types/window';
import { Field, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

declare const window: WindowWithGtag;

export default function GAHiddenFields() {
  const { asPath, locale } = useRouter();
  const { setFieldValue } = useFormikContext();

  const init = useCallback(() => {
    // giving 5s delay here to get the latest from window.datalayer global object of GA
    setTimeout(() => {
      const windowDataLayer = window?.dataLayer;

      if (process.env.NEXT_PUBLIC_GA_TRACKING_ID && windowDataLayer) {
        windowDataLayer.push(function () {
          // @ts-ignore
          setFieldValue('ga_client_id', this.get('ga_client_id'));
          // @ts-ignore
          setFieldValue('last_source', this.get('last_source'));
          // @ts-ignore
          setFieldValue('first_source', this.get('first_source'));
          // @ts-ignore
          setFieldValue('submit_id', this.get('submit_id'));
        });
      }
    }, 5000);
  }, [setFieldValue]);

  useEffect(() => {
    init();
  }, [asPath, init]);

  return (
    <>
      <Field type="hidden" id="ga_client_id" name="ga_client_id" />
      <Field type="hidden" id="first_source" name="first_source" />
      <Field type="hidden" id="last_source" name="last_source" />
      <Field
        type="hidden"
        id="page_form"
        name="page_form"
        value={`/${locale + asPath}`}
      />
      <Field type="hidden" id="submit_id" name="submit_id" />
    </>
  );
}
