package bubbleSort;

public class BubbleSort2 {

    public static void bubbleSort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n -1; i++) {
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
        int[] array = {3, 1, 2};
        System.out.println("Unsorted array:");
        for (int num : array) {
            System.out.println(num + " ");
        }
        System.out.println();

        bubbleSort(array);

        System.out.println("Sorted array:");
        for (int num : array) {
            System.out.println(num + " ");
        }
        System.out.println();
    }
}
