import { getCurrentUser } from '@aws-amplify/auth';
import { getUrl } from '@aws-amplify/storage';

export const loadImageIfExists = async () => {
    try {
      const user = await getCurrentUser();
      const fileName = `profile-pictures/${user.username}.jpg`;
  
      const { url } = await getUrl({ key: fileName, options: { accessLevel: 'protected' } });
      return url.href;
    } catch (err) {
      console.log("Aucune image de profil trouvée.");
    }
  };