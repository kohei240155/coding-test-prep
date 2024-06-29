package BogoSort;

import java.util.Arrays;
import java.util.Random;

public class Bogosort5 {

    public static boolean isSorted(int[] array) {
        for (int i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                return false;
            }
        }
        return true;
    }

    public static void shuffle(int[] array) {
        Random random = new Random();
        for (int i = 0; i < array.length; i++) {
            int randomIndexToSwap = random.nextInt(array.length);
            int temp = array[randomIndexToSwap];
            array[randomIndexToSwap] = array[i];
            array[i] = temp;
        }
    }

    public static void bogosort(int[] array) {
        while (!isSorted(array)) {
            shuffle(array);
        }
    }

    public static void main(String[] args) {
        int[] array = {3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5};
        System.out.println("Unsorted array: " + Arrays.toString(array));
        bogosort(array);
        System.out.println("Sorted array: " + Arrays.toString(array));
    }
    
}
