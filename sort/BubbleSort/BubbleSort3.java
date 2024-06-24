package BubbleSort;

import java.util.Arrays;

public class BubbleSort3 {

    public static void bubbleSort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }


    public static void main(String[] args) {
        int[] array = {3, 1, 2, 9, 29, 3, 5, 21, 6, 2, 1, 3, 4, 7, 29, 39, 59};
        bubbleSort(array);
        System.out.println(Arrays.toString(array));
    }
}
