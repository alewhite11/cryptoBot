import { CloudStorage } from './../interfaces/telegramInterfaces';
import { Field } from '../interfaces/Field';

  // Check if CloudStorage is available
  const isCloudStorageAvailable = (cs: CloudStorage | null): boolean => {
    return typeof cs !== null;
  };
  

  //Retrieve score from db
  export const getScoreCallback = (cs: CloudStorage | null, setScore: React.Dispatch<React.SetStateAction<number>>): void => {
    if (!isCloudStorageAvailable(cs)) {
      return;
    }
  
    cs?.getItem("score", (error, value) => {
      if (error) {
        return;
      }
  
      if (value !== undefined && !isNaN(parseInt(value, 10))) {
        // Update state
        setScore(parseInt(value, 10));
      }else{
        setScore(50)
      }
    });
  };

  //Save score data into db
  export const setScoreCallback = (cs: CloudStorage | null, score: number): void => {
    if (!isCloudStorageAvailable(cs)) {
        return;
    }

    cs?.setItem("score", score.toString(), (error: any, stored: boolean) => {
        if(error){
            return;
        }
    });
  }

  //Save fields data into db
  export const setFieldsCallback = (cs: CloudStorage | null, fields: Field[]): void => {
    if (!isCloudStorageAvailable(cs)) {
        return;
    }

    cs?.setItem("fields", JSON.stringify(fields), (error: any, stored: boolean) => {
        if(error){
            return;
        }
    });
  }

  //Retrieve fields from the db
  export const getFieldsCallback = (
    cs: CloudStorage | null,
    setFields: React.Dispatch<React.SetStateAction<Field[]>>,
    setDataLoaded: React.Dispatch<React.SetStateAction<boolean>>
): void => {
    if (!isCloudStorageAvailable(cs)) {
        return;
    }

    cs?.getItem("fields", (error: any, value: string | undefined) => {
        if (error) {
            console.error("Error fetching fields:", error);
            // Handle error (e.g., show error message)
            return;
        }

        if (value) {
            try {
                // Parse JSON string to array of Field objects
                const parsedFields: Field[] = JSON.parse(value);

                // Update state with fetched fields
                setFields(parsedFields);
            } catch (parseError) {
                console.error("Error parsing fields JSON:", parseError);
                // Handle parsing error (e.g., show error message)
            }
        } else {
            const newField: Field = {
                vegetable: "",
                plantedAt: new Date(), // This initializes plantedAt with the current date and time
                duration: 0
            };
            const lockedField: Field = {
                vegetable: "locked",
                plantedAt: new Date(),
                duration: 0
            }
            setFields([newField, lockedField])
        }

        // Set data loaded state
        setDataLoaded(true);
    });
};
  
//Save tasks data into db
export const setTasksCallback = (cs: CloudStorage | null, tasks: boolean[]): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  cs?.setItem("tasks", JSON.stringify(tasks), (error: any, stored: boolean) => {
      if(error){
          return;
      }
  });
}

//Retrieve tasks from the db
export const getTasksCallback = (
  cs: CloudStorage | null,
  setTasks: React.Dispatch<React.SetStateAction<boolean[]>>
): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  //setTasks([])
  //cs?.setItem("tasks", JSON.stringify([]))
  
  cs?.getItem("tasks", (error: any, value: string | undefined) => {
      if (error) {
          console.error("Error fetching fields:", error);
          // Handle error (e.g., show error message)
          return;
      }

      if (value) {
          try {
              // Parse JSON string to array of boolean objects
              const parsedTasks: boolean[] = JSON.parse(value);

              // Update state with fetched booleans
              setTasks(parsedTasks);
          } catch (parseError) {
              console.error("Error parsing fields JSON:", parseError);
              // Handle parsing error (e.g., show error message)
          }
      } else {
        setTasks([])
      }
  });
};

//Save tasks data into db
export const setClaimableCallback = (cs: CloudStorage | null, claimableTasks: boolean[]): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  cs?.setItem("claimTask", JSON.stringify(claimableTasks), (error: any, stored: boolean) => {
      if(error){
          return;
      }
  });
}

//Retrieve tasks from the db
export const getClaimableCallback = (
  cs: CloudStorage | null,
  setClaimableTasks: React.Dispatch<React.SetStateAction<boolean[]>>
): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  //setClaimableTasks([])
  //cs?.setItem("claimTask", JSON.stringify([]))

  cs?.getItem("claimTask", (error: any, value: string | undefined) => {
      if (error) {
          console.error("Error fetching fields:", error);
          // Handle error (e.g., show error message)
          return;
      }

      if (value) {
          try {
              // Parse JSON string to array of boolean objects
              const parsedClaimableTasks: boolean[] = JSON.parse(value);

              // Update state with fetched booleans
              setClaimableTasks(parsedClaimableTasks);
          } catch (parseError) {
              console.error("Error parsing fields JSON:", parseError);
              // Handle parsing error (e.g., show error message)
          }
      } else {
        setClaimableTasks([])
      }
  });
};