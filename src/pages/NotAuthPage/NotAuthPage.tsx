import type { FC } from 'react';
import { Page } from '@/components/Page.tsx';

export const NotAuthPage: FC = () => {
  return (
    <Page back={false}>Вы не авторизованы
    </Page>
  );
};
