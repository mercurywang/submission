interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface WithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends WithDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends WithDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends WithDescription {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
