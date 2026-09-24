export interface IWorkout {
  id: string;
  name: string;
  category: string[];
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; 
  sets: number;
  reps: string;
  duration: number; // in minutes
  calories: number;
  rating: number;
  image: string;
  description: string;
  instructions: string[];
}