import { localeMessages } from 'src/app/local-locale';

export interface PlatformPage {
  title: string;
  icon: string;
  to: string;
  subjects?: string | string[];
}

export const PlatformNavigation: PlatformPage[] = [
  {
    title: localeMessages.navigation.users,
    icon: 'perm_identity',
    to: 'user-control',
    subjects: 'User'
  },
  {
    title: localeMessages.navigation.workers,
    icon: 'engineering',
    to: 'workers',
    subjects: 'Worker'
  },
  {
    title: localeMessages.navigation.security,
    icon: 'security',
    to: 'security',
    subjects: ['Role', 'Claim']
  },
  {
    title: localeMessages.navigation.projects,
    icon: 'work_outline',
    to: 'home',
    subjects: 'Project'
  },
  {
    title: localeMessages.navigation.tasks,
    icon: 'done_outline',
    to: 'home',
    subjects: 'Task'
  },
  {
    title: localeMessages.navigation.time,
    icon: 'access_time',
    to: 'home',
  },
];
