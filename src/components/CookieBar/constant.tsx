import Link from 'next/link';
import { Text } from '@chakra-ui/react';
export const EN_DESCRIPTION = (
  <Text
    fontSize={'xs'}
    color={'rgb(134, 134, 134)'}
    fontWeight={'normal'}
    m={{ base: 0, md: '0 72px 12px' }}
    lineHeight={{ base: '15px', md: '18px' }}
  >
    Our website uses cookies to improve and personalize your experience. The
    site may also use cookies from third parties. By using this site, you
    consent to the use of cookies. See our{' '}
    <Link href={'/privacy-policy'} target="_blank" style={{ color: 'white' }}>
      privacy policy
    </Link>{' '}
    for more details
  </Text>
);

export const AR_DESCRIPTION = (
  <Text
    fontSize={'xs'}
    color={'rgb(134, 134, 134)'}
    fontWeight={'normal'}
    m={{ base: 0, md: '0 72px 12px' }}
    lineHeight={{ base: '15px', md: '18px' }}
  >
    يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط لتحسين تجربتك وتخصيصها. قد
    يستخدم الموقع أيضاً ملفات تعريف الارتباط التابعة لأطراف ثالثة. عند استخدام
    هذا الموقع، فإنك توافق على استخدام ملفات تعريف الارتباط. لمعرفة المزيد،
    الرجاء مراجعة $
    {
      <Link href={'/privacy-policy'} target="_blank" style={{ color: 'white' }}>
        سياسة الخصوصية
      </Link>
    }{' '}
    الخاصة بنا.
  </Text>
);
