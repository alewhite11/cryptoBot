import { CloudStorage } from './../interfaces/telegramInterfaces';
import { Field } from '../interfaces/Field';
import { Friend } from '../interfaces/Friend';
import { getUsersReferredBy, updateUser } from './firebaseConfig';
import { Pool } from '../interfaces/Pool';
import { isSameDay } from 'date-fns';

  // Check if CloudStorage is available
  const isCloudStorageAvailable = (cs: CloudStorage | null): boolean => {
    return typeof cs !== null;
  };

  //Retrieve registered status from db
  /* Registered values:
     -0: used to initialize the state
     -1: used to signal that user is not registered (first access)
     -2: user is already registered
  */
  export const getRegisteredCallback = (cs: CloudStorage | null, setRegistered: React.Dispatch<React.SetStateAction<number>>): void => {
    if (!isCloudStorageAvailable(cs)) {
      return;
    }
  
    cs?.getItem("registered", (error, value) => {
      if (error) {
        return;
      }
  
      if (value !== undefined && !isNaN(parseInt(value, 10))) {
        // Update state
        setRegistered(parseInt(value, 10));
      }else{
        setRegistered(1);
      }
    });
  };

  //Save registered status into db
  export const setRegisteredCallback = (cs: CloudStorage | null, registered: number): void => {
    if (!isCloudStorageAvailable(cs)) {
        return;
    }

    cs?.setItem("registered", registered.toString(), (error: any, stored: boolean) => {
        if(error){
            return;
        }
    });
  }

  //Store the number of planted vegetables 
  export const setPlantedVegetablesCallback = (cs: CloudStorage | null, map: Map<string, number>): void => {
    if (!isCloudStorageAvailable(cs)) {
        return;
    }

    const mapArray = Array.from(map.entries());
    cs?.setItem("plantedVegetables", JSON.stringify(mapArray), (error: any, stored: boolean) => {
        if (error) {
            return;
        }
    });
  }
  
  //Retrieve the number of planted vegetables
  export const getPlantedVegetablesCallback = (cs: CloudStorage | null, setPlantedVegetables: React.Dispatch<React.SetStateAction<Map<string, number>>>): void => {
    if (!isCloudStorageAvailable(cs)) {
        return;
    }

    cs?.getItem("plantedVegetables", (error, value) => {
        if (error) {
            return;
        }

        if (value !== undefined) {
            try {
                const mapArray: [string, number][] = JSON.parse(value);
                const parsedMap = new Map<string, number>(mapArray);
                // Update state
                setPlantedVegetables(parsedMap);
            } catch (e) {
                // Handle JSON parse error
                var newMap = new Map<string, number>();
                setPlantedVegetables(newMap);
            }
        } else {
          var newMap = new Map<string, number>();
          newMap.set('Radish', 3);
          setPlantedVegetables(newMap);
        }
    });
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

  //Retrieve apple score from db
  export const getAppleScoreCallback = (cs: CloudStorage | null, setAppleScore: React.Dispatch<React.SetStateAction<number>>): void => {
    if (!isCloudStorageAvailable(cs)) {
      return;
    }
  
    cs?.getItem("appleScore", (error, value) => {
      if (error) {
        return;
      }
  
      if (value !== undefined && !isNaN(parseInt(value, 10))) {
        // Update state
        setAppleScore(parseInt(value, 10));
      }else{
        setAppleScore(0)
      }
    });
  };

  //Save apple score data into db
  export const setAppleScoreCallback = (cs: CloudStorage | null, appleScore: number): void => {
    if (!isCloudStorageAvailable(cs)) {
        return;
    }

    cs?.setItem("appleScore", appleScore.toString(), (error: any, stored: boolean) => {
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
  setTasks: React.Dispatch<React.SetStateAction<boolean[]>>,
  setDailyStreak: React.Dispatch<React.SetStateAction<number>>
): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  function isNextDay(date1: Date, date2: Date): boolean {
    // Create a new date object to avoid mutating the original date
    const nextDay = new Date(date1);
    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay.getFullYear() === date2.getFullYear() &&
           nextDay.getMonth() === date2.getMonth() &&
           nextDay.getDate() === date2.getDate();
  }

  var dailyLoginTask : boolean = true

  cs?.getItem("lastDailyLogin", (error: any, value: string | undefined) => {
    if(error){
      return;
    }

    if(value){
      var lastDailyLoginDate : Date = new Date(value) //Contained last Claimed daily login date
      var currentDate : Date = new Date()

      if (isSameDay(lastDailyLoginDate, currentDate)){
        //Set daily login to true, already completed
        dailyLoginTask = true
      }else{
        //Not same day
        dailyLoginTask = false //Set daily login to false, to be completed
        if(isNextDay(lastDailyLoginDate, currentDate)){
          //Increase streak
          cs?.getItem("dailyLoginStreak", (error: any, value: string | undefined) => {
            if(error){
              return;
            }

            if (value !== undefined && !isNaN(parseInt(value, 10))) {
              // Update state
              var dailyStreak = parseInt(value, 10) + 1
              setDailyStreak(dailyStreak);

              cs?.setItem("dailyLoginStreak", dailyStreak.toString(), (error: any, stored: boolean) => {
                if(error){
                    return;
                }
              });
            }else{
              //Restart streak
              var dailyStreak = 1
              setDailyStreak(dailyStreak);

              cs?.setItem("dailyLoginStreak", dailyStreak.toString(), (error: any, stored: boolean) => {
                if(error){
                  return;
                }
              });
            }
          })
        }else{
          //Restart streak
          var dailyStreak = 1
          setDailyStreak(dailyStreak);

          cs?.setItem("dailyLoginStreak", dailyStreak.toString(), (error: any, stored: boolean) => {
            if(error){
                return;
            }
          });
        }
      }
    }else{
      dailyLoginTask = false //Set daily login to false, to be completed//Restart streak
      var dailyStreak = 1
      setDailyStreak(dailyStreak);

      cs?.setItem("dailyLoginStreak", dailyStreak.toString(), (error: any, stored: boolean) => {
        if(error){
            return;
        }
      });
    }
  })

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
            parsedTasks[1] = dailyLoginTask //Set dailyTask status

            // Update state with fetched booleans
            setTasks(parsedTasks);
        } catch (parseError) {
            console.error("Error parsing fields JSON:", parseError);
            alert("Error")
            // Handle parsing error (e.g., show error message)
        }
    } else {
      setTasks([])
    }
  });
};

export const setLastDailyClaimCallback = (cs: CloudStorage | null, lastDailyClaim: Date): void => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.setItem("lastDailyLogin", lastDailyClaim.toISOString(), (error: any, stored: boolean) => {
    if(error){
        return;
    }
});
}

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

//Get friend list
export const getFriendListCallback = async (cs : CloudStorage | null, telegramId : number, setFreindList : (friends : Friend[]) => void) : Promise<void> => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.getItem("friendListUpdateDate", async (error, value : string | undefined) => {
    if (error) {
      return;
    }

    if (value) {
      //User already updated the list before
      var updateDate : Date = new Date(JSON.parse(value))
      var currentDate : Date = new Date()
      
      if(updateDate > new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)){
        //Less than 24h ago, retireve from telegram cloudstore
        cs?.getItem("friendList", (error, friendList : string | undefined) => {
          if (friendList) {
            try {
                // Parse JSON string to array of boolean objects
                const parsedFriendList: Friend[] = JSON.parse(friendList);
  
                // Update state with fetched booleans
                setFreindList(parsedFriendList);
            } catch (parseError) {
                console.error("Error parsing fields JSON:", parseError);
            }
          }else{
            var friends : Friend[] = []
            cs?.setItem("friendList", JSON.stringify(friends), (error: any, stored: boolean) => {
              if(error){
                  return;
              }
            });
          }
        });
      }else{
        //More than 24h ago
        var friendListFS : Friend[] = []
        var friends = await getUsersReferredBy(telegramId)
        friends.forEach(user => {
          friendListFS.push({id: user.id, name : user.name, isActive: user.isActive})
        });
        setFreindList(friendListFS)
        cs?.setItem("friendList", JSON.stringify(friendListFS), (error: any, stored: boolean) => {
          if(error){
              return;
          }
        });
        cs?.setItem("friendListUpdateDate", JSON.stringify(new Date()), (error: any, stored: boolean) => {
          if(error){
              return;
          }
        });
      } 
    }else{
      var friendListFS : Friend[] = []
      var friends = await getUsersReferredBy(telegramId)
      friends.forEach(user => {
        friendListFS.push({id: user.id, name : user.name, isActive: user.isActive})
      });
      setFreindList(friendListFS)
      cs?.setItem("friendList", JSON.stringify(friendListFS), (error: any, stored: boolean) => {
        if(error){
            return;
        }
      });
      cs?.setItem("friendListUpdateDate", JSON.stringify(new Date()), (error: any, stored: boolean) => {
        if(error){
            return;
        }
      });
    }
  });
}

export const updateFriendListCallback = (cs : CloudStorage | null, telegramId : string) : void => {
  updateUser(telegramId.toString())
  cs?.getItem("friendList", (error, friendList : string | undefined) => {
    if (friendList) {
      try {
          // Parse JSON string to array of boolean objects
          const parsedFriendList: Friend[] = JSON.parse(friendList);
          const friendIndex = parsedFriendList.findIndex(f => f.id === telegramId);
          if (friendIndex !== -1) {
            parsedFriendList[friendIndex].isActive = true;

            // Convert the updated array back to JSON string
            const updatedFriendList = JSON.stringify(parsedFriendList);

            // Store the updated friend list back to storage
            cs?.setItem("friendList", updatedFriendList, (error) => {
              if (error) {
                return;
              }
            });
          } else {
            console.log("Friend not found");
          }
      } catch (parseError) {
          console.error("Error parsing fields JSON:", parseError);
      }
    }
  });
}

//Retrieve score from db
export const getPlantScoreCallback = (cs: CloudStorage | null, setPlantScore: React.Dispatch<React.SetStateAction<number>>): void => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.getItem("plantScore", (error, value) => {
    if (error) {
      return;
    }

    if (value !== undefined && !isNaN(parseFloat(value))) {
      // Update state
      setPlantScore(parseFloat(value));
    }else{
      setPlantScore(0)
    }
  });
};

//Save score data into db
export const setPlantScoreCallback = (cs: CloudStorage | null, plantScore: number): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  cs?.setItem("plantScore", plantScore.toString(), (error: any, stored: boolean) => {
      if(error){
          return;
      }
  });
}

//Retrieve score from db
export const getPlantHourlyIncomeCallback = (cs: CloudStorage | null, setPlantHourlyIncome: React.Dispatch<React.SetStateAction<number>>): void => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.getItem("plantHourlyIncome", (error, value) => {
    if (error) {
      return;
    }

    if (value !== undefined && !isNaN(parseInt(value, 10))) {
      // Update state
      setPlantHourlyIncome(parseInt(value, 10));
    }else{
      setPlantHourlyIncome(0)
    }
  });
};

//Save score data into db
export const setPlantHourlyIncomeCallback = (cs: CloudStorage | null, plantHourlyIncome: number): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  cs?.setItem("plantHourlyIncome", plantHourlyIncome.toString(), (error: any, stored: boolean) => {
      if(error){
          return;
      }
  });
}

//Store the status of owned pools
export const setPoolStatusCallback = (cs: CloudStorage | null, map: Map<string, boolean>): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  const mapArray = Array.from(map.entries());
  cs?.setItem("poolStatus", JSON.stringify(mapArray), (error: any, stored: boolean) => {
      if (error) {
          return;
      }
  });
}

//Retrieve the status of owned pools
export const getPoolStatusCallback = (cs: CloudStorage | null, setPoolStatus: React.Dispatch<React.SetStateAction<Map<string, boolean>>>): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  cs?.getItem("poolStatus", (error, value) => {
      if (error) {
          return;
      }

      if (value !== undefined) {
          try {
              const mapArray: [string, boolean][] = JSON.parse(value);
              const parsedMap = new Map<string, boolean>(mapArray);
              // Update state
              setPoolStatus(parsedMap);
          } catch (e) {
              // Handle JSON parse error
              var newMap = new Map<string, boolean>();
              setPoolStatus(newMap);
          }
      } else {
        var newMap = new Map<string, boolean>();
        setPoolStatus(newMap);
      }
  });
};

export const setLastAccessDateCallback = (cs: CloudStorage | null, lastAccess: Date): void => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.setItem("lastAccess", lastAccess.toISOString(), (error: any, stored: boolean) => {
    if(error){
        return;
    }
});
}

export const getLastAccessDateCallback = (cs: CloudStorage | null, setLastAccessDate: React.Dispatch<React.SetStateAction<Date | undefined>>): void => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.getItem("lastAccess", (error, value) => {
    if (error) {
        return;
    }

    if (value !== undefined) {
        try {
          var updateDate : Date = new Date(value)
            // Update state
            setLastAccessDate(updateDate);
        } catch (e) {
            // Handle JSON parse error
            var newDate : Date = new Date()
            setLastAccessDate(newDate);
        }
    } else {
      var newDate : Date = new Date()
      setLastAccessDate(newDate);
    }
});
}