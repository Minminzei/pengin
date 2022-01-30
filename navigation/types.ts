import { PathConfig } from '@react-navigation/core';

type RouteName = 'Chats' | 'Setting' | 'Followers' | 'Rounds' | 'Feeds'
  | 'Drill' | 'Drills' | 'Curriculum' | 'Curriculums' | 'Lesson' | 'Lessons' | 'Round'
  | 'Article' | 'Articles' | 'Movie' | 'Movies' | 'Activity' | 'Activities' | 'Partner' | 'Partners'
  | 'Review' | 'Reviews' | 'Information' | 'Informations' | 'Support' | 'Supports' | 'Chat'
  | 'Guideline' | 'Company' | 'Privacy' | 'Contact' | 'Bookmarks'
  | 'Post' | 'Theory' | 'PostCoach' | 'PostDiagnosis' | 'PostTotal' | 'Swings' | 'Swing'
  | 'Term' | 'Faq' | 'Display' | 'Customer' | 'Register' | 'Missions' | 'Accounts'
  | 'League' | 'School' | 'SchoolLite' | 'SchoolAgl'
  | 'Rankings' | 'InviteVerify' | 'Invite' | 'VerifyEmail' | 'VerifyPassword' | 'Apply'
  | 'MyCoach' | 'Plan' | 'User' | 'Timelines' | 'Timeline' | 'Works' | 'Page' | 'Request'
  | 'MyActivities' | 'Profile' | 'Invites' | 'LeagueReview' | 'Host' | 'Tutorial' | '/';

const initialRouteName:RouteName = '/';
const initialTabScreen = 'Feeds';
const MainScreens:RouteName[] = [
  'Post', 'Chats', 'Page', 'Timelines', 'Followers',
  'Works', 'Setting', 'Feeds',
];

export default RouteName;

type Params = {
  id?: number;
}

type LinkingProps = {
  [key in RouteName]: PathConfig<Params>;
};

type OptionProps = {
  title: string;
  tabBarLabel?: string;
  gestureEnabled?: boolean;
};

type BaseProps = {
  component: Function;
  options?: OptionProps;
};

type ScreenProps = Partial<{
  [key in RouteName]: BaseProps;
}>;

export {
  MainScreens,
  LinkingProps,
  RouteName,
  initialTabScreen,
  initialRouteName,
  ScreenProps,
  BaseProps,
  OptionProps,
};
