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
  // Save an item to CloudStorage
  /*const saveItem = async (item: CloudStorageItem): Promise<boolean> => {
    if (!isCloudStorageAvailable()) {
      console.error("CloudStorage is not available");
      return false;
    }
  
    try {
      await window.Telegram.WebApp.CloudStorage.setItem(item.key, item.value);
      return true;
    } catch (error) {
      console.error("Failed to save item to CloudStorage", error);
      return false;
    }
  };
  
  // Get an item from CloudStorage
  const getItem = async (key: string): Promise<string | null> => {
    if (!isCloudStorageAvailable()) {
      console.error("CloudStorage is not available");
      return null;
    }
  
    try {
      const value = await window.Telegram.WebApp.CloudStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Failed to get item from CloudStorage", error);
      return null;
    }
  };
  
  // Remove an item from CloudStorage
  const removeItem = async (key: string): Promise<boolean> => {
    if (!isCloudStorageAvailable()) {
      console.error("CloudStorage is not available");
      return false;
    }
  
    try {
      await window.Telegram.WebApp.CloudStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Failed to remove item from CloudStorage", error);
      return false;
    }
  };
  
  // Get all items from CloudStorage
  const getAllItems = async (): Promise<CloudStorageItem[]> => {
    if (!isCloudStorageAvailable()) {
      console.error("CloudStorage is not available");
      return [];
    }
  
    try {
      const keys = await window.Telegram.WebApp.CloudStorage.keys();
      const items = await Promise.all(
        keys.map(async (key: string) => {
          const value = await window.Telegram.WebApp.CloudStorage.getItem(key);
          return { key, value } as CloudStorageItem;
        })
      );
      return items;
    } catch (error) {
      console.error("Failed to get all items from CloudStorage", error);
      return [];
    }
  };
  
  export { saveItem, getItem, removeItem, getAllItems };*/
  