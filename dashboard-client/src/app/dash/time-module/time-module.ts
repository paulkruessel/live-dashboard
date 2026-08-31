import { Component, computed, OnDestroy, signal } from '@angular/core';
import { CardModule } from '@openng/optimus-ui/card';

@Component({
  imports: [CardModule],
  selector: 'app-time-module',
  styleUrl: './time-module.css',
  templateUrl: './time-module.html',
})
export class TimeModule implements OnDestroy {

    currentDate = signal(new Date());

    currentTime = computed(() =>
        this.currentDate().toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
        })
    );

    currentDateFormatted = computed(() =>
    this.currentDate().toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
);

    dividerVisible = computed(() =>
        this.currentDate().getSeconds() % 2 === 0
    );

    private intervalId = setInterval(() => {
        this.currentDate.set(new Date());
    }, 500);

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
    }
}
