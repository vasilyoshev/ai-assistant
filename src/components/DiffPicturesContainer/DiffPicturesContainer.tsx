import { PictureContainer } from "../DiffPicture/DiffPicture";
import styles from './DiffPicturesContainer.module.scss';

export const DiffPicturesContainer = () => <div className={styles.wrapper}><PictureContainer /><PictureContainer /></div>;