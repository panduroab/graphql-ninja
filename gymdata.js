const program = [
  {
    weekNumber: 1,
    daysPerWeek: 4,
    days: [
      {
        number: 1,
        name: "Day 1",
        muscleDescription: "Chest & Calves",
        muscleGroups: [
          {
            name: "Chest"
          },
          {
            name: "Calves"
          }
        ],
        routine: [
          {
            exerciseName: "Flat Chest Press",
            targeMuscleGroup: "Chest",
            sets: 3,
            reps: {
              min: 4,
              max: 6
            },
            warmUp: true
          }
        ] 
      }
    ]
  }
];