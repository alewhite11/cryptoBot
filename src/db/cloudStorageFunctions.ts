import { CloudStorage } from './../interfaces/telegramInterfaces';
import { Field } from '../interfaces/Field';
import { Friend } from '../interfaces/Friend';
import { getUsersReferredBy, updateUser } from './firebaseConfig';
import { Pool } from '../interfaces/Pool';
import { isSameDay } from 'date-fns';
import { plantPassBeginningDate, plantPassEndDate } from './tonCosts';

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
    const nextDay = new Date(date1);
    nextDay.setDate(nextDay.getDate() + 1);

    return nextDay.getFullYear() === date2.getFullYear() &&
           nextDay.getMonth() === date2.getMonth() &&
           nextDay.getDate() === date2.getDate();
  }

  function getItemAsync(key: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      cs?.getItem(key, (error: any, value: string | undefined) => {
        if (error) {
          reject(error);
        } else {
          resolve(value);
        }
      });
    });
  }

  function setItemAsync(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cs?.setItem(key, value, (error: any, stored: boolean) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  let dailyLoginTask = false;

  getItemAsync("lastDailyLogin")
    .then((value) => {
      if (value) {
        const lastDailyLoginDate = new Date(value);
        const currentDate = new Date();

        if (isSameDay(lastDailyLoginDate, currentDate)) {
          dailyLoginTask = true;
          return Promise.resolve();
        } else {
          if (isNextDay(lastDailyLoginDate, currentDate)) {
            return getItemAsync("dailyLoginStreak")
              .then((streakValue) => {
                let dailyStreak = 1;
                if (streakValue !== undefined && !isNaN(parseInt(streakValue, 10))) {
                  dailyStreak = parseInt(streakValue, 10);
                }
                setDailyStreak(dailyStreak);
                return setItemAsync("dailyLoginStreak", dailyStreak.toString());
              });
          } else {
            const dailyStreak = 1;
            setDailyStreak(dailyStreak);
            return setItemAsync("dailyLoginStreak", dailyStreak.toString());
          }
        }
      } else {
        dailyLoginTask = false;
        const dailyStreak = 1;
        setDailyStreak(dailyStreak);
        return setItemAsync("dailyLoginStreak", dailyStreak.toString());
      }
    })
    .then(() => {
      return getItemAsync("tasks");
    })
    .then((value) => {
      if (value) {
        try {
          const parsedTasks: boolean[] = JSON.parse(value);
          parsedTasks[1] = dailyLoginTask;
          setTasks(parsedTasks);
        } catch (parseError) {
          console.error("Error parsing fields JSON:", parseError);
          setTasks([]);
        }
      } else {
        setTasks([]);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
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

  cs?.getItem("dailyLoginStreak", (error: any, value: string | undefined) => {
    if(error){
      return;
    }

    if (value !== undefined && !isNaN(parseInt(value, 10))) {
      // Update state
      var dailyStreak = parseInt(value, 10) + 1

      cs?.setItem("dailyLoginStreak", dailyStreak.toString(), (error: any, stored: boolean) => {
        if(error){
          return;
        }
      });
    }else{
      //Restart streak
      var dailyStreak = 1

      cs?.setItem("dailyLoginStreak", dailyStreak.toString(), (error: any, stored: boolean) => {
        if(error){
          return;
        }
      });
    }
  })
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
export const getFriendListCallback = async (cs : CloudStorage | null, telegramId : number, setFreindList : (friends : Friend[]) => void, setTonScore: (tonScore: number) => void) : Promise<void> => {
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
                var tonScore = 0
                parsedFriendList.forEach(user => {
                  if(user.septemberPass === true){
                    tonScore += 0.1
                  }
                  if(user.octoberPass === true){
                    tonScore += 0.1
                  }
                });
                cs?.getItem("withdrawedTONs", (error, value) => {
                  if (error) {
                    return;
                  }
              
                  if (value !== undefined && !isNaN(parseFloat(value))) {
                    //Not first withdraw, increment and save
                    var previousValue = parseFloat(value)
                    var newScore = tonScore - previousValue
                    setTonScore(newScore)
                  }else{
                    setTonScore(tonScore)
                  }
                });
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
        var tonScore = 0
        var friendListFS : Friend[] = []
        var friends = await getUsersReferredBy(telegramId)
        friends.forEach(user => {
          if(user.septemberPass === true){
            tonScore += 0.1
          }
          if(user.octoberPass === true){
            tonScore += 0.1
          }
          friendListFS.push({id: user.id, name : user.name, isActive: user.isActive, septemberPass: user.septemberPass, octoberPass: user.octoberPass })
        });
        cs?.getItem("withdrawedTONs", (error, value) => {
          if (error) {
            return;
          }
      
          if (value !== undefined && !isNaN(parseFloat(value))) {
            //Not first withdraw, increment and save
            var previousValue = parseFloat(value)
            var newScore = tonScore - previousValue
            setTonScore(newScore)
          }else{
            setTonScore(tonScore)
          }
        });
        setFreindList(friendListFS)
        cs?.setItem("friendListUpdateDate", JSON.stringify(new Date()), (error: any, stored: boolean) => {
          if(error){
              return;
          }
        });
        cs?.setItem("friendList", JSON.stringify(friendListFS), (error: any, stored: boolean) => {
          if(error){
            //Error in setting, too many refs, refresh at each access
            const date = new Date();
            date.setFullYear(date.getFullYear() - 10); // Set the date to 10 years ago
            cs?.setItem("friendListUpdateDate", JSON.stringify(date), (error: any, stored: boolean) => {
              if(error){
                return;
              }
            });
            return;
          }
        });
      } 
    }else{
      var tonScore = 0
      var friendListFS : Friend[] = []
      var friends = await getUsersReferredBy(telegramId)
      friends.forEach(user => {
        if(user.septemberPass === true){
          tonScore += 0.1
        }
        if(user.octoberPass === true){
          tonScore += 0.1
        }
        friendListFS.push({id: user.id, name : user.name, isActive: user.isActive, septemberPass: user.septemberPass, octoberPass: user.octoberPass })
      });
      setFreindList(friendListFS)
      cs?.getItem("withdrawedTONs", (error, value) => {
        if (error) {
          return;
        }
    
        if (value !== undefined && !isNaN(parseFloat(value))) {
          //Not first withdraw, increment and save
          var previousValue = parseFloat(value)
          var newScore = tonScore - previousValue
          setTonScore(newScore)
        }else{
          setTonScore(tonScore)
        }
      });
      cs?.setItem("friendListUpdateDate", JSON.stringify(new Date()), (error: any, stored: boolean) => {
        if(error){
            return;
        }
      });
      cs?.setItem("friendList", JSON.stringify(friendListFS), (error: any, stored: boolean) => {
        if(error){
          //Error in setting, too many refs, refresh at each access
          const date = new Date();
          date.setFullYear(date.getFullYear() - 10); // Set the date to 10 years ago
          cs?.setItem("friendListUpdateDate", JSON.stringify(date), (error: any, stored: boolean) => {
            if(error){
                return;
            }
          });
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

//Retrieve pass status from db
export const getPassStatusCallback = (cs: CloudStorage | null, setPassStatus: React.Dispatch<React.SetStateAction<boolean>>): void => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.getItem("plantPass", (error, value) => {
    if (error) {
      return;
    }

    if (value !== undefined) {
      try {
        var passDate : Date = new Date(value)
        if(passDate > plantPassBeginningDate && passDate < plantPassEndDate){
          //Pass is valid
          setPassStatus(true)
        }else{
          setPassStatus(false)
        }
      } catch (e) {
          // Handle JSON parse error
          setPassStatus(false)
      }
  } else {
    setPassStatus(false)
  }
  });
};

//Save plant pass data into db
export const setPassStatusCallback = (cs: CloudStorage | null, plantPassStatus: boolean): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  if(plantPassStatus === true){
    cs?.setItem("plantPass", new Date().toISOString(), (error: any, stored: boolean) => {
      if(error){
          return;
      }
    });
  }else{
    cs?.setItem("plantPass", '', (error: any, stored: boolean) => {
      if(error){
          return;
      }
    });
  }
}

//Save items data into db
export const setItemsCallback = (cs: CloudStorage | null, items: boolean[]): void => {
  if (!isCloudStorageAvailable(cs)) {
      return;
  }

  cs?.setItem("items", JSON.stringify(items), (error: any, stored: boolean) => {
      if(error){
          return;
      }
  });
}

 //Retrieve items from db
 export const getItemsCallback = (cs: CloudStorage | null, setItems: React.Dispatch<React.SetStateAction<boolean[]>>): void => {
  if (!isCloudStorageAvailable(cs)) {
    return;
  }

  cs?.getItem("items", (error, value) => {
    if (error) {
      return;
    }

    if (value) {
      try {
        const parsedItems: boolean[] = JSON.parse(value);

        setItems(parsedItems);
      } catch (parseError) {
        console.error("Error parsing fields JSON:", parseError);
        setItems([])
      }
    } else {
      setItems([]);
    }
  });
};

export const incrementWithdrawedTONs = (cs: CloudStorage, newWithdrawAmount: number) : void => {
  if(!isCloudStorageAvailable(cs)){
    return;
  }

  cs?.getItem("withdrawedTONs", (error, value) => {
    if (error) {
      return;
    }

    if (value !== undefined && !isNaN(parseFloat(value))) {
      //Not first withdraw, increment and save
      var previousValue = parseFloat(value)
      var newValue = previousValue + newWithdrawAmount
      cs?.setItem("withdrawedTONs", newValue.toString(), (error: any, stored: boolean) => {
        if(error){
            return;
        }
      });
    }else{
      cs?.setItem("withdrawedTONs", newWithdrawAmount.toString(), (error: any, stored: boolean) => {
        if(error){
            return;
        }
      });
    }
  });
};